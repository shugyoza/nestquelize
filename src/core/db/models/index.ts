/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';

const config = require('../config/db.config')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export const db = { sequelize, Sequelize };
