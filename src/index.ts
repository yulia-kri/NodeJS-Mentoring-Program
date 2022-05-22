import express from 'express';

import { routes } from './routes';

const app = express();
const router = express.Router();

const PORT = 3000;

routes(router);

app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`the app is running on ${PORT}`);
});
