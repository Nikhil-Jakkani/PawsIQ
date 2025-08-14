import { Router } from 'express';
import { auth } from '../../../middlewares/auth.js';
import { providerController } from '../../controllers/provider/index.js';

const router = Router();

router.get('/me', auth('provider'), providerController.getMyProfile);

export default router;
