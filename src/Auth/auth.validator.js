const Joi = require('@hapi/joi')

export const loginValidator = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().required().messages({
    "string.empty": `Password cannot be an empty field`,
    "any.required": 'Password is required'
  })
});

