// import { Dialect } from 'sequelize/types';
require('dotenv').config();
const config = {
  database: {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};

module.exports = config.database;
