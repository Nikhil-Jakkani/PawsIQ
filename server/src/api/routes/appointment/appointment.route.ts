import express from 'express';
import { auth } from '../../../middlewares/auth.js';
import { validate } from '../../../middlewares/validate.js';
import { appointmentController } from '../../controllers/appointment/appointment.controller.js';
import { appointmentValidation } from '../../validations/appointment/appointment.validation.js';

const router = express.Router();

router
  .route('/')
  .post(auth('user'), validate(appointmentValidation.create), appointmentController.create)
  .get(auth('user'), validate(appointmentValidation.list), appointmentController.listMine);

router
  .route('/:id')
  .get(auth('user'), validate(appointmentValidation.get), appointmentController.getMine)
  .put(auth('user'), validate(appointmentValidation.updateUser), appointmentController.updateMine)
  .delete(auth('user'), validate(appointmentValidation.remove), appointmentController.removeMine);

export default router;
