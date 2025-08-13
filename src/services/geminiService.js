const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const generatePetCareSuggestions = async (petData) => {
  try {
    const prompt = `
    As a professional veterinarian and pet care expert, provide comprehensive care recommendations for the following pet:

    Pet Information:
    - Name: ${petData.name}
    - Type: ${petData.type}
    - Breed: ${petData.breed}
    - Age: ${petData.age}
    - Weight: ${petData.weight}
    - Gender: ${petData.gender}
    - Last Checkup: ${petData.lastCheckup}
    - Current Vaccinations: ${petData.vaccinations}

    Please provide detailed recommendations in the following categories. Format your response as a JSON object with the following structure:

    {
      "health": {
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "priority": "high/medium/low",
        "nextCheckup": "suggested date or timeframe"
      },
      "grooming": {
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "frequency": "daily/weekly/monthly",
        "specialCare": ["special care item 1", "special care item 2", ...]
      },
      "vaccinations": {
        "upcoming": ["vaccine 1", "vaccine 2", ...],
        "schedule": "next vaccination timeframe",
        "boosters": ["booster 1", "booster 2", ...]
      },
      "nutrition": {
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "dailyCalories": "estimated calories",
        "feedingSchedule": "recommended schedule"
      },
      "exercise": {
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "duration": "daily exercise duration",
        "activities": ["activity 1", "activity 2", ...]
      },
      "behavioral": {
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "training": ["training tip 1", "training tip 2", ...],
        "enrichment": ["enrichment activity 1", "enrichment activity 2", ...]
      },
      "preventive": {
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "seasonalCare": ["seasonal tip 1", "seasonal tip 2", ...],
        "emergencyTips": ["emergency tip 1", "emergency tip 2", ...]
      }
    }

    Make sure all recommendations are specific to the pet's breed, age, and current health status. Be thorough but practical.
    `;

    const stored = localStorage.getItem('pawsiq_user');
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.tokens?.access?.token;
    if (!token) {
      throw new Error('Authentication token not found.');
    }

    const response = await fetch(`${API_URL}/user/ai/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch suggestions');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating pet care suggestions:', error);
    throw new Error(error.message || 'Failed to generate pet care suggestions. Please try again.');
  }
};

export const analyzePetSymptoms = async (petData, symptoms) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
    As a professional veterinarian, analyze the following symptoms for this pet and provide guidance. 
    
    IMPORTANT DISCLAIMER: This is for informational purposes only and should not replace professional veterinary care.

    Pet Information:
    - Name: ${petData.name}
    - Type: ${petData.type}
    - Breed: ${petData.breed}
    - Age: ${petData.age}
    - Weight: ${petData.weight}
    - Gender: ${petData.gender}

    Reported Symptoms:
    ${symptoms}

    Please provide your analysis in the following JSON format:

    {
      "urgencyLevel": "emergency/urgent/moderate/mild",
      "urgencyColor": "red/orange/yellow/green",
      "summary": "Brief summary of the situation",
      "possibleCauses": ["cause 1", "cause 2", "cause 3"],
      "recommendations": {
        "immediate": ["immediate action 1", "immediate action 2"],
        "monitoring": ["what to monitor 1", "what to monitor 2"],
        "whenToSeekHelp": ["condition 1", "condition 2"]
      },
      "homeCareTips": ["tip 1", "tip 2", "tip 3"],
      "redFlags": ["warning sign 1", "warning sign 2"],
      "vetVisit": {
        "recommended": true/false,
        "timeframe": "immediately/within 24 hours/within a few days/routine checkup",
        "reason": "explanation of why vet visit is needed"
      },
      "disclaimer": "This analysis is for informational purposes only. Always consult with a qualified veterinarian for proper diagnosis and treatment."
    }

    Consider the pet's breed-specific health concerns and age-related factors in your analysis.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse the JSON response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
    }
    
    // Fallback if JSON parsing fails
    return {
      urgencyLevel: "moderate",
      urgencyColor: "yellow",
      summary: "Unable to analyze symptoms properly. Please consult with a veterinarian.",
      possibleCauses: ["Various conditions possible"],
      recommendations: {
        immediate: ["Monitor your pet closely"],
        monitoring: ["Watch for changes in behavior", "Monitor eating and drinking"],
        whenToSeekHelp: ["If symptoms worsen", "If new symptoms appear"]
      },
      homeCareTips: ["Ensure pet is comfortable", "Provide fresh water", "Monitor closely"],
      redFlags: ["Difficulty breathing", "Severe lethargy", "Loss of consciousness"],
      vetVisit: {
        recommended: true,
        timeframe: "within 24 hours",
        reason: "Professional evaluation needed for proper diagnosis"
      },
      disclaimer: "This analysis is for informational purposes only. Always consult with a qualified veterinarian for proper diagnosis and treatment."
    };
    
  } catch (error) {
    console.error('Error analyzing pet symptoms:', error);
    throw new Error('Failed to analyze symptoms. Please try again.');
  }
};