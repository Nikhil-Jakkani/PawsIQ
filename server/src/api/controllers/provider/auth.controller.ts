import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync.js';
import { providerAuthService } from '../../services/provider/auth.service.js';

const register = catchAsync(async (req: Request, res: Response) => {
  const provider = await providerAuthService.register(req.body);
  res.status(httpStatus.CREATED).send({ provider });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { provider_email, provider_password } = req.body;
  const { provider, tokens } = await providerAuthService.login(provider_email, provider_password);
  res.send({ provider, tokens });
});

export const providerAuthController = {
  register,
  login,
};
