import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync.js';
import { aiService } from '../../services/user/index.js';

const generatePetCareSuggestions = catchAsync(async (req: Request, res: Response) => {
  // Receive the simplified pet object directly from the frontend
  const pet = req.body;
  const suggestions = await aiService.generatePetCareSuggestions(pet);
  res.status(httpStatus.OK).send(suggestions);
});

export default {
  generatePetCareSuggestions,
};
