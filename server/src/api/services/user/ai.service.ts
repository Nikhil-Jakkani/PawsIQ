import { GoogleGenerativeAI } from '@google/generative-ai';

import { ApiError } from '../../utils/ApiError.js';
import httpStatus from 'http-status';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const generatePetCareSuggestions = async (prompt: string) => {
  if (!prompt) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Prompt is required');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI response.');
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
