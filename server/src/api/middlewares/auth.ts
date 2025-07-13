import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError.js';
import { supabase } from '../../config/supabase.js';

interface JwtPayload {
  id: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (error || !admin) {
      return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }

    next();
  } catch (error) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
};
