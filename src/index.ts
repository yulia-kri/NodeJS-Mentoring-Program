import express from 'express';
import cors from 'cors';

import { routes } from './controllers/routes';
import { associate } from './data-access/associations';
import { sequelize } from './data-access/models';
import { verifyToken } from './controllers/controllers';

const app = express();
const router = express.Router();

const PORT = 3000;

routes(router);

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    if (req.url === '/login') {
        next();
    } else {
        verifyToken(req, res, next);
    }
});
app.use(router);

app.listen(PORT, async () => {
    console.log(`the app is running on ${PORT}`);

    await sequelize.authenticate();
    console.log('database connected');

    associate();
});
