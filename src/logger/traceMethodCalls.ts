import morgan from 'morgan';

import { isDev, logger } from './logger';

export const traceMethodCalls = morgan(
    (tokens, req, res) => {
        return isDev()
            ? `${tokens.method(req, res)} method to url: ${tokens.url(req, res)}, request body is ${JSON.stringify(
                (req as any).body || {},
            )}, took ${tokens['response-time'](req, res)}ms`
            : null;
    },
    {
        stream: {
            write: message => {
                logger.info(message);
            },
        },
    },
);
