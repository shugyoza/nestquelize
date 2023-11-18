import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

import {
  attributes,
  tableName,
  AccountRole,
  AccountInstance,
} from '../core/db/models/account.model';

@Table({ tableName })
export class AccountEntity extends Model<AccountInstance> {
  @Column({ ...attributes.id })
  id: number;

  @Column({ ...attributes.username })
  username: string;

  @Column({ ...attributes.password })
  password: string;

  @Column({ ...attributes.role })
  role: AccountRole;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
