// Simple test to verify Gemini API integration
import { generatePetCareSuggestions } from '../services/geminiService.js';

const testPet = {
  name: 'Max',
  type: 'dog',
  breed: 'Golden Retriever',
  age: '3 years',
  weight: '65 lbs',
  gender: 'male',
  lastCheckup: '2025-05-01',
  vaccinations: 'Up to date'
};

// Test function
async function testGeminiAPI() {
  try {
    console.log('Testing Gemini API with pet data:', testPet);
    const suggestions = await generatePetCareSuggestions(testPet);
    console.log('AI Suggestions received:', suggestions);
    return suggestions;
  } catch (error) {
    console.error('Test failed:', error);
    return null;
  }
}

// Export for use in browser console
window.testGeminiAPI = testGeminiAPI;

export { testGeminiAPI };