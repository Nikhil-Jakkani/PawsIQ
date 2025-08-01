import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userAuthService } from '../../services/user/auth.service.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const userAuthController = {
  login: catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userAuthService.loginUserWithEmailAndPassword(email, password);
    res.status(httpStatus.OK).send(user);
  }),

  register: catchAsync(async (req: Request, res: Response) => {
    const user = await userAuthService.registerUser(req.body);
    res.status(httpStatus.CREATED).send(user);
  }),

  me: catchAsync(async (req: any, res: Response) => {
    const user = await userAuthService.getCurrentUser(req.user.user_id);
    res.status(httpStatus.OK).send(user);
  }),

  refreshTokens: catchAsync(async (req: Request, res: Response) => {
    const tokens = await userAuthService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
  }),

  logout: catchAsync(async (req: any, res: Response) => {
    await userAuthService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
  }),

  forgotPassword: catchAsync(async (req: Request, res: Response) => {
    const resetPasswordToken = await userAuthService.generateResetPasswordToken(req.body.email);
    // TODO: Send email with reset password link
    res.status(httpStatus.NO_CONTENT).send();
  }),

  resetPassword: catchAsync(async (req: Request, res: Response) => {
    await userAuthService.resetPassword(req.query.token as string, req.body.password);
    res.status(httpStatus.NO_CONTENT).send();
  }),

  verifyEmail: catchAsync(async (req: Request, res: Response) => {
    // await userAuthService.verifyEmail(req.query.token as string);
    res.status(httpStatus.NO_CONTENT).send();
  }),
};
