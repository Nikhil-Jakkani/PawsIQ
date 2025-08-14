import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../api/utils/catchAsync.js';
import { ApiError } from '../../../api/utils/ApiError.js';
import suggestionService from '../../services/user/suggestion.service.js';

// Extend the Express Request type to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
}

const createSuggestion = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const suggestion = await suggestionService.createSuggestion({
    ...req.body,
    user_id: userId,
  });

  res.status(httpStatus.CREATED).send(suggestion);
});

const getUserSuggestions = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { petId } = req.query;

  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  const suggestions = await suggestionService.getUserSuggestions(
    userId,
    petId as string | undefined
  );
  res.status(httpStatus.OK).send(suggestions);
});

const updateSuggestion = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Verify the suggestion belongs to the user
  const suggestions = await suggestionService.getUserSuggestions(userId);
  const suggestionExists = suggestions.some(s => s.id === id);
  
  if (!suggestionExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Suggestion not found');
  }

  const updatedSuggestion = await suggestionService.updateSuggestion(id, req.body);
  res.status(httpStatus.OK).send(updatedSuggestion);
});

const deleteSuggestion = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  }

  // Verify the suggestion belongs to the user
  const suggestions = await suggestionService.getUserSuggestions(userId);
  const suggestionExists = suggestions.some(s => s.id === id);
  
  if (!suggestionExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Suggestion not found');
  }

  await suggestionService.deleteSuggestion(id);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createSuggestion,
  getUserSuggestions,
  updateSuggestion,
  deleteSuggestion,
};
