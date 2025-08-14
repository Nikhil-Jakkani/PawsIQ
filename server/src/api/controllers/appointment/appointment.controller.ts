import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync.js';
import { appointmentService } from '../../services/appointment/appointment.service.js';

// User-facing
const create = catchAsync(async (req: any, res: Response) => {
  const userId = BigInt(req.user.user_id); // set by global auth middleware
  const appt = await appointmentService.createAppointment(userId, req.body);
  res.status(httpStatus.CREATED).send(appt);
});

const listMine = catchAsync(async (req: any, res: Response) => {
  const userId = BigInt(req.user.user_id);
  const { page, limit } = req.query;
  const data = await appointmentService.getUserAppointments(userId, { page: Number(page), limit: Number(limit) });
  res.status(httpStatus.OK).send(data);
});

const getMine = catchAsync(async (req: any, res: Response) => {
  const userId = BigInt(req.user.user_id);
  const id = Number(req.params.id);
  const appt = await appointmentService.getUserAppointmentById(userId, id);
  res.status(httpStatus.OK).send(appt);
});

const updateMine = catchAsync(async (req: any, res: Response) => {
  const userId = BigInt(req.user.user_id);
  const id = Number(req.params.id);
  const appt = await appointmentService.updateUserAppointment(userId, id, req.body);
  res.status(httpStatus.OK).send(appt);
});

const removeMine = catchAsync(async (req: any, res: Response) => {
  const userId = BigInt(req.user.user_id);
  const id = Number(req.params.id);
  const result = await appointmentService.deleteUserAppointment(userId, id);
  res.status(httpStatus.OK).send(result);
});

export const appointmentController = {
  create,
  listMine,
  getMine,
  updateMine,
  removeMine,
};
