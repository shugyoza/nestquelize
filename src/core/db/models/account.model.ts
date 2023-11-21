import { Model, Optional, DataTypes } from 'sequelize';

import { db } from '.';

export enum AccountRole {
  SUPER = 'super',
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

const roles = [
  AccountRole.SUPER,
  AccountRole.OWNER,
  AccountRole.ADMIN,
  AccountRole.USER,
];

interface AccountAttributes {
  id: number;
  email: string;
  username: string;
  password: string;
  role: AccountRole;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AccountCreationAttributes
  // means this property can be undefined at the time of document creation
  extends Optional<AccountAttributes, 'id'> {}

export interface AccountInstance
  extends Model<AccountAttributes, AccountCreationAttributes>,
    AccountAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const tableName = 'Accounts';

export const attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(...roles),
    defaultValue: AccountRole.USER,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

export const Account = db.sequelize.define<AccountInstance>(
  'Account',
  attributes
);
