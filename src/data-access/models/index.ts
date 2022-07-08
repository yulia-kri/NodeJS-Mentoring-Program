import { Sequelize } from 'sequelize';
import * as configJson from '../../../db/config/config.json';

const env = process.env.NODE_ENV || 'development';
const config = configJson[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
