import { Sequelize } from 'sequelize-typescript';

import { AccountEntity } from '../../account/account.entity';
import { ProvideToken } from '../../shared/constants';

const tables = [
  AccountEntity,
  // add additional models here
];

async function initSequelize(config: any, models: any[]) {
  const sequelize = new Sequelize(config);
  sequelize.addModels(models);
  await sequelize.sync();

  return sequelize;
}

export const dbProviders = [
  {
    provide: ProvideToken.SEQUELIZE,
    useFactory: () => {
      const config = {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database:
          process.env.NODE_ENV === 'development'
            ? process.env.DB_DEV_NAME
            : process.env.NODE_ENV === 'test'
            ? process.env.DB_TEST_NAME
            : process.env.DB_PROD_NAME,
        models: [],
        logging: true,
      };

      return initSequelize(config, tables);
    },
  },
];
