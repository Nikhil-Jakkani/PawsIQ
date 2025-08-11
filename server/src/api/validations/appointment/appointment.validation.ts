import Joi from 'joi';

const statusEnum = ['Scheduled', 'Cancelled', 'Completed'] as const;
const typeEnum = ['Checkup', 'Vaccination', 'Grooming', 'Training', 'Others'] as const;

const idParam = {
  params: Joi.object().keys({
    id: Joi.number().integer().min(1).required(),
  }),
};

const paginationQuery = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
  }),
};

const bigIntLike = Joi.alternatives().try(
  Joi.number().integer(),
  Joi.string().pattern(/^[0-9]+$/)
);

const create = {
  body: Joi.object().keys({
    pet_id: bigIntLike.required(),
    appointment_type: Joi.string().valid(...typeEnum).required(),
    appointment_date: Joi.string().isoDate().required(),
    appointment_status: Joi.string().valid(...statusEnum).optional(),
    appointment_comments: Joi.string().allow('').optional(),
  }),
};

const list = {
  ...paginationQuery,
};

const get = {
  ...idParam,
};

const updateUser = {
  ...idParam,
  body: Joi.object()
    .keys({
      pet_id: bigIntLike.optional(),
      appointment_type: Joi.string().valid(...typeEnum).optional(),
      appointment_date: Joi.string().isoDate().optional(),
      appointment_status: Joi.string().valid(...statusEnum).optional(),
      appointment_comments: Joi.string().allow('').optional(),
    })
    .min(1),
};

const remove = {
  ...idParam,
};

export const appointmentValidation = {
  create,
  list,
  get,
  updateUser,
  remove,
};
