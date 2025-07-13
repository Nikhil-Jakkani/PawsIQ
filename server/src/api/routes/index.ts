import { Router } from 'express';
import adminAuthRoutes from './admin/auth.route.js';
import adminUserRoutes from './admin/user.route.js';

const router = Router();

router.use('/admin/auth', adminAuthRoutes);
router.use('/admin/users', adminUserRoutes);

export default router;
