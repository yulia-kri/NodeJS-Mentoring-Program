import express from 'express';

import { routes } from './controllers/routes';
import { sequelize } from './data-access/models';

const app = express();
const router = express.Router();

const PORT = 3000;

routes(router);

app.use(express.json());

app.use(router);

app.listen(PORT, async () => {
    console.log(`the app is running on ${PORT}`);

    await sequelize.authenticate();
    console.log('database connected');
});
