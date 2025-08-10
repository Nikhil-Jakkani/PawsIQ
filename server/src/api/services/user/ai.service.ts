import { GoogleGenerativeAI } from '@google/generative-ai';

import { ApiError } from '../../utils/ApiError.js';
import httpStatus from 'http-status';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const generatePetCareSuggestions = async (pet: any) => {
  if (!pet || Object.keys(pet).length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pet data is required');
  }

  // Using the new simplified pet object structure from the frontend
  const { name, type, breed, age, gender, health_details } = pet;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a professional veterinary assistant. Based on the following pet details, provide a comprehensive set of personalized care recommendations.

      Pet Details:
      - Name: ${name}
      - Type: ${type}
      - Breed: ${breed}
      - Age: ${age}
      - Gender: ${gender}
      - Known Health Details: ${health_details}

      Please generate recommendations covering the following categories: health, grooming, vaccinations, nutrition, exercise, behavioral, and preventive.
      
      IMPORTANT: Your entire response must be a single, valid JSON object. Do not include any text, explanations, or markdown formatting before or after the JSON object. The JSON object should have the following structure, with each category containing a 'suggestion' (a brief title) and 'details' (a 1-2 sentence explanation):
      {
        "health": { "suggestion": "Annual Check-up", "details": "Schedule a yearly wellness exam with the vet." },
        "grooming": { "suggestion": "Regular Brushing", "details": "Brush the coat 2-3 times a week to prevent matting." },
        "vaccinations": { "suggestion": "Core Vaccinations", "details": "Ensure core vaccines like Rabies and Distemper are up to date." },
        "nutrition": { "suggestion": "High-Quality Diet", "details": "Feed a balanced diet appropriate for the pet's age and breed." },
        "exercise": { "suggestion": "Daily Walks", "details": "Provide at least 30-60 minutes of exercise daily." },
        "behavioral": { "suggestion": "Positive Reinforcement", "details": "Use positive reinforcement for training and good behavior." },
        "preventive": { "suggestion": "Flea and Tick Control", "details": "Use a monthly flea and tick preventive treatment." }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('Raw AI Response:', text);

    try {
      // Find the start and end of the JSON object to handle cases where the AI wraps it in text
      const startIndex = text.indexOf('{');
      const endIndex = text.lastIndexOf('}');
      if (startIndex === -1 || endIndex === -1) {
        throw new Error('No JSON object found in AI response.');
      }
      const jsonString = text.substring(startIndex, endIndex + 1);
      const suggestions = JSON.parse(jsonString);
      return suggestions;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error processing AI suggestions.');
    }
  } catch (error) {
    console.error('Error generating pet care suggestions:', error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to generate pet care suggestions.');
  }
};

export default {
  generatePetCareSuggestions,
};
