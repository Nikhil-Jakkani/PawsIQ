import express from 'express';
import { validate } from '../../../middlewares/validate.js';
import { providerAuthController } from '../../controllers/provider/auth.controller.js';
import { providerAuthValidation } from '../../validations/provider/auth.validation.js';

const router = express.Router();

router.post('/register', validate(providerAuthValidation.register), providerAuthController.register);
router.post('/login', validate(providerAuthValidation.login), providerAuthController.login);

export default router;
