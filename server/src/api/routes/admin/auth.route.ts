import { Router } from 'express';
import { authController } from '../../controllers/admin/auth.controller.js';
import { validate } from '../../middlewares/validate.js';
import { loginSchema } from '../../validations/admin/auth.validation.js';

const router = Router();

router.post('/login', validate(loginSchema), authController.login);

export default router;
