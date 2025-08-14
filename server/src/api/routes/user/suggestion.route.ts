import { Router } from 'express';
import { auth } from '../../../api/middlewares/auth.js';
import suggestionController from '../../../api/controllers/user/suggestion.controller.js';

const router = Router();

// Protected routes (require authentication)
// Apply auth middleware to all routes
router.use((req, res, next) => auth(req, res, next));

router
  .route('/')
  .post(suggestionController.createSuggestion)
  .get(suggestionController.getUserSuggestions);

router
  .route('/:id')
  .patch(suggestionController.updateSuggestion)
  .delete(suggestionController.deleteSuggestion);

export default router;
