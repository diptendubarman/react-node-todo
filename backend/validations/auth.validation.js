const Joi = require("joi");

function validate(body) {
  const schema = Joi.object({
    password: Joi.string(),
    email: Joi.string().email(),
  });

  const options = {
    abortEarly: true, // include all errors, not just the first one
    allowUnknown: false, // allow unknown fields in the request
    stripUnknown: false, // remove unknown fields from the request
  };

  return schema.validate(body, options);
}

module.exports = validate;
