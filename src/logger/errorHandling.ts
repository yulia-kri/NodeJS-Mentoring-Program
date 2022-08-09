import { Request, Response, NextFunction } from 'express';

import { logger } from './logger';

export const errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
        return next();
    }

    logger.error(err.message);
    res.sendStatus(500);
};
