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

export const userValidation = {
  // GET /users
  getUsers: {
    query: Joi.object().keys({
      user_full_name: Joi.string(),
      user_email_id: Joi.string(),
      user_status: Joi.string(),
      sortBy: Joi.string(),
      sortType: Joi.string().valid('asc', 'desc'),
      limit: Joi.number().integer().min(1).max(100),
      page: Joi.number().integer().min(1),
    }),
  },

  // GET /users/:userId
  getUser: {
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  },

  // POST /users
  createUser: {
    body: Joi.object().keys({
      user_full_name: Joi.string().required().min(2).max(100),
      user_email_id: Joi.string().required().email(),
      user_password: Joi.string().required().custom(password),
      user_phone_number: Joi.string().required().min(10).max(15),
      user_second_phone_number: Joi.string().min(10).max(15).allow('', null),
      user_status: Joi.string().valid('active', 'inactive', 'suspended'),
      paid_user: Joi.boolean(),
    }),
  },

  // PATCH /users/:userId
  updateUser: {
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
    body: Joi.object()
      .keys({
        user_full_name: Joi.string().min(2).max(100),
        user_email_id: Joi.string().email(),
        user_password: Joi.string().custom(password),
        user_phone_number: Joi.string().min(10).max(15),
        user_second_phone_number: Joi.string().min(10).max(15).allow('', null),
        user_status: Joi.string().valid('active', 'inactive', 'suspended'),
        paid_user: Joi.boolean(),
      })
      .min(1), // at least one field to update
  },

  // DELETE /users/:userId
  deleteUser: {
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  },

  // PATCH /users/profile
  updateProfile: {
    body: Joi.object()
      .keys({
        user_full_name: Joi.string().min(2).max(100),
        user_email_id: Joi.string().email(),
        user_phone_number: Joi.string().min(10).max(15),
        user_second_phone_number: Joi.string().min(10).max(15).allow('', null),
      })
      .min(1), // at least one field to update
  },
};
