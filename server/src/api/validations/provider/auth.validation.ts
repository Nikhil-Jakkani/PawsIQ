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

export const providerAuthValidation = {
  register: {
    body: Joi.object().keys({
      provider_name: Joi.string().required(),
      provider_email: Joi.string().required().email(),
      provider_password: Joi.string().required().custom(password),
      provider_contact_number: Joi.string().required(),
      services_offered: Joi.string().required(),
    }),
  },
  login: {
    body: Joi.object().keys({
      provider_email: Joi.string().required().email(),
      provider_password: Joi.string().required(),
    }),
  },
};
