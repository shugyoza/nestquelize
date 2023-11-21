import { Column, Model, Table } from 'sequelize-typescript';

import {
  attributes,
  tableName,
  AccountRole,
  AccountInstance,
} from '../core/db/models/account.model';

@Table({ tableName })
export class AccountEntity extends Model<AccountInstance> {
  @Column(attributes.id)
  id: number;

  @Column(attributes.email)
  email: string;

  @Column(attributes.username)
  username: string;

  @Column(attributes.password)
  password: string;

  @Column(attributes.role)
  role: AccountRole;

  @Column(attributes.createdAt)
  createdAt: Date;

  @Column(attributes.updatedAt)
  updatedAt: Date;
}
