import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyCCoBo9LVDOd_sdG4yzyt1-IMQay-IV1Pk';
const genAI = new GoogleGenerativeAI(API_KEY);

export const generatePetCareSuggestions = async (petData) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

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
      health: {
        recommendations: ["Regular health monitoring recommended", "Consult with veterinarian for personalized care plan"],
        priority: "medium",
        nextCheckup: "6 months"
      },
      grooming: {
        recommendations: ["Regular brushing", "Nail trimming as needed"],
        frequency: "weekly",
        specialCare: ["Check ears regularly", "Dental care"]
      },
      vaccinations: {
        upcoming: ["Annual boosters"],
        schedule: "As per veterinary schedule",
        boosters: ["Core vaccines"]
      },
      nutrition: {
        recommendations: ["High-quality pet food", "Proper portion control"],
        dailyCalories: "Consult veterinarian",
        feedingSchedule: "2-3 times daily"
      },
      exercise: {
        recommendations: ["Daily exercise", "Mental stimulation"],
        duration: "30-60 minutes",
        activities: ["Walking", "Playing"]
      },
      behavioral: {
        recommendations: ["Positive reinforcement training", "Socialization"],
        training: ["Basic commands", "House training"],
        enrichment: ["Interactive toys", "Puzzle feeders"]
      },
      preventive: {
        recommendations: ["Regular health checks", "Parasite prevention"],
        seasonalCare: ["Weather-appropriate care"],
        emergencyTips: ["Know emergency vet contact", "First aid basics"]
      }
    };
    
  } catch (error) {
    console.error('Error generating pet care suggestions:', error);
    throw new Error('Failed to generate pet care suggestions. Please try again.');
  }
};