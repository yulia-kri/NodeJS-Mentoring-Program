import { Dialect } from 'sequelize';

export const host = process.env.DB_HOST || '';
export const database = process.env.DB_NAME || '';
export const port = Number(process.env.DB_PORT) || 4000;
export const user = process.env.DB_USER || '';
export const password = process.env.DB_PASS || '';

export const options = {
    host,
    port,
    dialect: 'postgres' as Dialect,
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};
