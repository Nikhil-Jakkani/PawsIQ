import { Router } from 'express';
import { auth } from '../../middlewares/auth.js';
import { validate } from '../../middlewares/validate.js';
import { userController } from '../../controllers/admin/user.controller.js';
import { userValidation } from '../../validations/admin/user.validation.js';

const router = Router();

router
  .route('/')
  .post(auth, validate(userValidation.createUser), userController.createUser)
  .get(auth, validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth, validate(userValidation.getUser), userController.getUser)
  .patch(auth, validate(userValidation.updateUser), userController.updateUser)
  .delete(auth, validate(userValidation.deleteUser), userController.deleteUser);

export default router;
