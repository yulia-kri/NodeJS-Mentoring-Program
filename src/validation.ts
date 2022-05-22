import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { HttpCode } from './models';

const errorResponse = (schemaErrors: Joi.ValidationError) => {
    const errors = schemaErrors.details.map(error => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors,
    };
};

export const validateSchema = (schema: Joi.ObjectSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false,
        });

        if (error?.isJoi) {
            res.status(HttpCode.BadRequest).json(errorResponse(error));
        } else {
            next();
        }
    };
};
