import { Sequelize } from 'sequelize-typescript';

import { User } from 'src/users/user.entity';

const tables = [
  User,
  // add additional models here
];

// pure function to initialize sequelize with any db config?
async function initSequelize(config: any, models: any[]) {
  const sequelize = new Sequelize(config);
  sequelize.addModels(models);
  await sequelize.sync();

  return sequelize;
}

export const dbProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: () => {
      // when taken out, these 'process.env' did not pull from .env
      const config = {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [],
        logging: true,
      };

      return initSequelize(config, tables);
    },
  },
];
