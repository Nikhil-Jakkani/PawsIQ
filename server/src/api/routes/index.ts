import { Router } from 'express';
import adminAuthRoutes from './admin/auth.route.js';
import adminUserRoutes from './admin/user.route.js';
import userAiRoutes from './user/ai.route.js';
import userSuggestionRoutes from './user/suggestion.route.js';
import userAuthRoutes from './user/auth.route.js';
import userRoutes from './user/user.route.js';
import providerAuthRoutes from './provider/auth.route.js';
import providerRoutes from './provider/provider.route.js';
import appointmentRoutes from './appointment/appointment.route.js';
import mediaRoutes from './media.route.js';
import petRoutes from './pet/pet.route.js';

const router = Router();

router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/users', adminUserRoutes);

router.use('/user/auth', userAuthRoutes);
router.use('/user/ai', userAiRoutes);
router.use('/user/suggestions', userSuggestionRoutes);
router.use('/user', userRoutes);

router.use('/provider/auth', providerAuthRoutes);
router.use('/provider', providerRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/media', mediaRoutes);
router.use('/pets', petRoutes);

export default router;
