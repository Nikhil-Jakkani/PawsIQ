import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { authService } from '../../services/admin/auth.service.js';
import { catchAsync } from '../../utils/catchAsync.js';

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const response = await authService.login(email, password);
  res.status(httpStatus.OK).send(response);
});

export const authController = {
  login,
};
