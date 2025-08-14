import Joi from 'joi';

const password = (value: string, helpers: any) => {
  if (value.length < 8) {
    return helpers.message('Password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Password must contain at least 1 letter and 1 number');
  }
  return value;
};

export const authValidation = {
  register: {
    body: Joi.object().keys({
      user_full_name: Joi.string().required().min(2).max(100),
      user_email_id: Joi.string().required().email(),
      user_password: Joi.string().required().custom(password),
      user_phone_number: Joi.string().required().min(10).max(15),
      user_second_phone_number: Joi.string().min(10).max(15).allow('', null),
    }),
  },
  login: {
    body: Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  refreshTokens: {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  },
  forgotPassword: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  },
  resetPassword: {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
    body: Joi.object().keys({
      password: Joi.string().required().custom(password),
    }),
  },
  verifyEmail: {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
  },
};
