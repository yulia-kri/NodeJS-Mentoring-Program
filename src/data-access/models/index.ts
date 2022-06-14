const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
config.define = {
    underscored: true,
};

const sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
