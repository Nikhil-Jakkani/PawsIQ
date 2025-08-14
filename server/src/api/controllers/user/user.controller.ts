import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { userService } from '../../services/user/user.service.js';
import { ApiError } from '../../utils/ApiError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const userController = {
  /**
   * Get user profile
   */
  getProfile: catchAsync(async (req: any, res: Response) => {
    const user = await userService.getUserById(req.user.user_id);
    res.send(user);
  }),

  /**
   * Update user profile
   */
  updateProfile: catchAsync(async (req: any, res: Response) => {
    const user = await userService.updateUserById(req.user.user_id, req.body);
    res.send(user);
  }),

  /**
   * Get users (admin only)
   */
  getUsers: catchAsync(async (req: any, res: Response) => {
    const filter = req.query;
    const options = {
      page: parseInt(req.query.page as string, 10) || 1,
      limit: parseInt(req.query.limit as string, 10) || 10,
      sortBy: req.query.sortBy as string,
      sortType: req.query.sortType as 'asc' | 'desc',
    };
    
    const result = await userService.queryUsers(filter, options);
    res.send(result);
  }),

  /**
   * Get user by ID (admin only)
   */
  getUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getUserById(parseInt(req.params.userId, 10));
    res.send(user);
  }),

  /**
   * Create user (admin only)
   */
  createUser: catchAsync(async (req: Request, res: Response) => {
    // const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send();
  }),

  /**
   * Update user (admin only)
   */
  updateUser: catchAsync(async (req: Request, res: Response) => {
    const user = await userService.updateUserById(parseInt(req.params.userId, 10), req.body);
    res.send(user);
  }),

  /**
   * Delete user (admin only)
   */
  deleteUser: catchAsync(async (req: Request, res: Response) => {
    await userService.deleteUserById(parseInt(req.params.userId, 10));
    res.status(httpStatus.NO_CONTENT).send();
  }),
};
