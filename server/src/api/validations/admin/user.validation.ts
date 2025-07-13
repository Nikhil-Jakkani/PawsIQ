import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
  }),
};

const getUsers = {
  query: Joi.object().keys({}), // No query params for now
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string(),
      phone: Joi.string(),
      address: Joi.string(),
    })
    .min(1), // Require at least one field to be updated
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().uuid().required(),
  }),
};

export const userValidation = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
