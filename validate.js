
//validation(xac minh)
const Joi = require('@hapi/joi');
//  function describe and validation both data in output and input 
const registerValidatoin = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};
const loginValidatoin = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports.loginValidatoin = loginValidatoin;
module.exports.registerValidatoin = registerValidatoin;
