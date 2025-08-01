import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync.js';
import { providerService } from '../../services/provider/index.js';

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const provider = await providerService.getProviderById(req.user.id);
  res.status(httpStatus.OK).send(provider);
});

export const providerController = {
  getMyProfile,
};
