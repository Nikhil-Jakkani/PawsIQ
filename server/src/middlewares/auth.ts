import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';
import { ApiError } from '../api/utils/ApiError.js';
import { tokenTypes } from '../config/tokens.js';

const auth = (...requiredRights: string[]) => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
      }

      // Verify token
      const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Check if token is in database and not blacklisted
      const { data: tokenDoc, error } = await db
        .from('tokens')
        .select('*')
        .eq('token', token)
        .eq('blacklisted', false)
        .single();

      if (error || !tokenDoc) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
      }

      // Check if token is expired
      if (new Date() > new Date(tokenDoc.expires)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
      }

      const { role } = payload;
      if (!role) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token: Role is missing');
      }

      // Check if the user's role is allowed
      if (requiredRights.length && !requiredRights.includes(role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      let entity: any;
      let entityError: any;

      switch (role) {
        case 'user': {
          const { data, error } = await db.from('PIQ_User').select('*').eq('user_id', payload.sub).single();
          entity = data;
          entityError = error;
          if (entity && entity.user_status !== 'active') {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User account is not active');
          }
          break;
        }
        case 'admin': {
          const { data, error } = await db.from('admins').select('*').eq('admin_id', payload.sub).single();
          entity = data;
          entityError = error;
          if (entity && entity.admin_status !== 'active') {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User account is not active');
          }
          break;
        }
        case 'provider': {
          const { data, error } = await db.from('PIQ_Service_Provider').select('*').eq('provider_id', payload.sub).single();
          entity = data;
          entityError = error;
          if (entity && entity.provider_status !== 'active') {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User account is not active');
          }
          break;
        }
        default:
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid role specified in token');
      }

      if (entityError || !entity) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
      }

      // Attach user/admin/provider entity to the request object
      req.user = entity;
      req.token = token;

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Token expired'));
      } else if (error instanceof jwt.JsonWebTokenError) {
        next(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token'));
      } else {
        next(error);
      }
    }
  };
};

export { auth };
