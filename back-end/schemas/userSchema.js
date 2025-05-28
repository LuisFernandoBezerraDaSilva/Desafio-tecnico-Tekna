const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(15).required(),
  password: Joi.string().required(),
  userId: Joi.string(),
});

module.exports = userSchema;