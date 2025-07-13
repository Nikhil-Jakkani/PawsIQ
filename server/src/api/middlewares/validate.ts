import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiError } from '../utils/ApiError.js';
import httpStatus from 'http-status';

export const validate = (schema: Record<string, Joi.Schema>) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema = Joi.object(
    Object.keys(schema).reduce((acc, key) => {
      acc[key as keyof typeof schema] = schema[key];
      return acc;
    }, {} as Record<keyof typeof schema, Joi.Schema>)
  );

  const objectToValidate = Object.keys(schema).reduce((acc, key) => {
    acc[key as keyof typeof schema] = req[key as keyof Request];
    return acc;
  }, {} as Record<keyof typeof schema, any>);

  const { value, error } = validSchema.validate(objectToValidate, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};
