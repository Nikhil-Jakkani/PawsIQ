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
      provider_full_name: Joi.string().required(),
      provider_email_id: Joi.string().required().email(),
      provider_password: Joi.string().required().custom(password),
      provider_phone_number: Joi.string().required(),
      // Add other required fields for provider registration here
    }),
  },
  login: {
    body: Joi.object().keys({
      provider_email_id: Joi.string().required().email(),
      provider_password: Joi.string().required(),
    }),
  },
};
