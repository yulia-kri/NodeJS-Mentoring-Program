import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
});

export const updateUserSchema = Joi.object().keys({
    login: Joi.string().optional(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])')).optional(),
    age: Joi.number().integer().min(4).max(130).optional(),
});
