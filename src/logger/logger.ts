import { createLogger, format, transports } from 'winston';

export const isDev = () => process.env.NODE_ENV === 'development';

export const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(log => `[${log.timestamp} - ${log.level}]: ${log.message}`),
    ),
    transports: [
        isDev()
            ? new transports.Console()
            : new transports.File({
                filename: 'error.log',
                level: 'error',
            }),
    ],
    exitOnError: false
});
