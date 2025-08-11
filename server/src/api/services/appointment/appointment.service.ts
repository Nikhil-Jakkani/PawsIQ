import httpStatus from 'http-status';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/ApiError.js';

const prisma = new PrismaClient();

export type AppointmentStatus = 'Scheduled' | 'Cancelled' | 'Completed';
export type AppointmentType = 'Checkup' | 'Vaccination' | 'Grooming' | 'Training' | 'Others';

const assertStatus = (status: string): AppointmentStatus => {
  const allowed: AppointmentStatus[] = ['Scheduled', 'Cancelled', 'Completed'];
  if (!allowed.includes(status as AppointmentStatus)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid status. Allowed: ${allowed.join(', ')}`);
  }
  return status as AppointmentStatus;
};

const assertType = (type: string): AppointmentType => {
  const allowed: AppointmentType[] = ['Checkup', 'Vaccination', 'Grooming', 'Training', 'Others'];
  if (!allowed.includes(type as AppointmentType)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Invalid appointment_type. Allowed: ${allowed.join(', ')}`);
  }
  return type as AppointmentType;
};

const ensurePetBelongsToUser = async (userId: bigint, petId: bigint) => {
  const pet = await prisma.pIQ_Pets.findFirst({ where: { pet_id: petId, user_id: userId } });
  if (!pet) throw new ApiError(httpStatus.FORBIDDEN, 'Pet does not belong to user');
};

// User-facing operations
const createAppointment = async (
  userId: bigint,
  body: {
    pet_id: number | string | bigint;
    appointment_type: AppointmentType;
    appointment_date: string;
    appointment_status?: AppointmentStatus;
    appointment_comments?: string | null;
  }
) => {
  const pet_id = BigInt(body.pet_id);
  await ensurePetBelongsToUser(userId, pet_id);

  const type = assertType(body.appointment_type);
  const status: AppointmentStatus = body.appointment_status ? assertStatus(body.appointment_status) : 'Scheduled';

  const dt = new Date(body.appointment_date);
  if (isNaN(dt.getTime())) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid appointment_date');

  const created = await prisma.pIQ_Appointments.create({
    data: {
      pet_id,
      appointment_type: type,
      appointment_date: dt,
      appointment_status: status,
      appointment_comments: body.appointment_comments ?? null,
    },
  });

  return created;
};

const getUserAppointments = async (
  userId: bigint,
  opts: { page?: number; limit?: number }
) => {
  const page = Math.max(1, Number(opts.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(opts.limit) || 10));
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.pIQ_Appointments.findMany({
      where: { PIQ_Pets: { user_id: userId } },
      orderBy: { appointment_date: 'desc' },
      skip,
      take: limit,
    }),
    prisma.pIQ_Appointments.count({ where: { PIQ_Pets: { user_id: userId } } }),
  ]);

  return { items, page, limit, total, pages: Math.ceil(total / limit) };
};

const getUserAppointmentById = async (userId: bigint, id: number) => {
  const appt = await prisma.pIQ_Appointments.findUnique({ where: { appointment_id: id }, include: { PIQ_Pets: true } });
  if (!appt || appt.PIQ_Pets.user_id !== userId) throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  return appt;
};

const updateUserAppointment = async (
  userId: bigint,
  id: number,
  body: Partial<{
    pet_id: number | string | bigint;
    appointment_type: AppointmentType;
    appointment_date: string;
    appointment_status: AppointmentStatus;
    appointment_comments: string | null;
  }>
) => {
  const existing = await prisma.pIQ_Appointments.findUnique({ where: { appointment_id: id }, include: { PIQ_Pets: true } });
  if (!existing || existing.PIQ_Pets.user_id !== userId) throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');

  const data: any = {};
  if (body.pet_id !== undefined) {
    const newPetId = BigInt(body.pet_id);
    await ensurePetBelongsToUser(userId, newPetId);
    data.pet_id = newPetId;
  }
  if (body.appointment_type) data.appointment_type = assertType(body.appointment_type);
  if (body.appointment_status) data.appointment_status = assertStatus(body.appointment_status);
  if (body.appointment_comments !== undefined) data.appointment_comments = body.appointment_comments;
  if (body.appointment_date) {
    const dt = new Date(body.appointment_date);
    if (isNaN(dt.getTime())) throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid appointment_date');
    data.appointment_date = dt;
  }

  const updated = await prisma.pIQ_Appointments.update({ where: { appointment_id: id }, data });
  return updated;
};

const deleteUserAppointment = async (userId: bigint, id: number) => {
  const appt = await prisma.pIQ_Appointments.findUnique({ where: { appointment_id: id }, include: { PIQ_Pets: true } });
  if (!appt || appt.PIQ_Pets.user_id !== userId) throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  await prisma.pIQ_Appointments.delete({ where: { appointment_id: id } });
  return { success: true };
};

export const appointmentService = {
  createAppointment,
  getUserAppointments,
  getUserAppointmentById,
  updateUserAppointment,
  deleteUserAppointment,
};
