import express from 'express';

import { routes } from './controllers/routes';
import { associate } from './data-access/associations';
import { sequelize } from './data-access/models';
import { logger, errorHandling, traceMethodCalls } from './logger';

const app = express();
const router = express.Router();

const PORT = 3001;

process
    .on('unhandledRejection', (reason, promise) => {
        logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
    })
    .on('uncaughtException', (err, origin) => {
        logger.error(`Caught exception: ${err}, exception origin: ${origin}`);
    });

routes(router);

app.use(express.json());
app.use(traceMethodCalls);
app.use(router);
app.use(errorHandling);

app.listen(PORT, async () => {
    logger.info(`the app is running on ${PORT}`);

    await sequelize.authenticate();
    logger.info('database connected');

    associate();
});
