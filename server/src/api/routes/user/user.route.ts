import express from 'express';
import { userController } from '../../controllers/user/user.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { validate } from '../../../middlewares/validate.js';
import { userValidation } from '../../validations/user/user.validation.js';

const router = express.Router();

// Protected routes - require authentication
router.use(auth());

// User profile routes
router
  .route('/profile')
  .get(userController.getProfile)
  .patch(validate(userValidation.updateProfile), userController.updateProfile);

// User management routes (admin only)
router.use(auth('admin'));
router
  .route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(validate(userValidation.updateUser), userController.updateUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

export default router;
