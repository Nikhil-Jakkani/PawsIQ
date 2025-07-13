import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '../../services/admin/user.service.js';
import { catchAsync } from '../../utils/catchAsync.js';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.send(users);
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId);
  res.send(user);
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export const userController = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
