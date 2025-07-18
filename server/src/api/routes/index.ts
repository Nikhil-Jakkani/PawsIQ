import { Router } from 'express';
import adminAuthRoutes from './admin/auth.route.js';
import adminUserRoutes from './admin/user.route.js';
import userAiRoutes from './user/ai.route.js';

const router = Router();

router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/users', adminUserRoutes);
router.use('/user/ai', userAiRoutes);

export default router;
