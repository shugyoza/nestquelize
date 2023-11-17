/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

dotenv.config();

const _config = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const config = {
  development: {
    ..._config,
    database: process.env.DB_DEV_NAME,
  },
  test: {
    ..._config,
    database: process.env.DB_TEST_NAME,
  },
  production: {
    ..._config,
    database: process.env.DB_PROD_NAME,
  },
};

module.exports = config;
