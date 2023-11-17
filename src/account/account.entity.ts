/* typeorm's entity === sequelize' model
nestjs has closer familiarity with typeorm, thus using typeorm's terms */
import {
  Column,
  Model,
  Table,
  DataType,
  // AllowNull,
  // Unique,
  // AutoIncrement,
  // Default,
  // Length,
  BelongsTo,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
} from 'sequelize-typescript';
import { PersonModel } from 'src/people/person.entity';

import { length } from 'src/shared/constants';
import {
  attributes,
  tableName,
  AccountRole,
  AccountInstance,
} from 'src/core/db/models/account.model';

/*
Order of decorators matter. @Column must be last
Error, e.g: 
'...
throw new Error(`@Column annotation is missing for "${propertyName}" of class "${target.constructor.name}"` +
Error: @Column annotation is missing for "password" of class "User" or annotation order is wrong.
...
*/
@Table({ tableName })
export class AccountEntity extends Model<AccountInstance> {
  /* ...ERROR [ExceptionHandler] A column called 'id' was added to the attributes of 'Users' but not marked with 'primaryKey: true'
  Error: A column called 'id' was added to the attributes of 'Users' but not marked with 'primaryKey: true' ...
  Cause: should pass a 'primaryKey: true' in an object to @Column */
  // @AllowNull(false)
  // @AutoIncrement
  // @Unique
  // @PrimaryKey
  // @Column(DataType.INTEGER)
  /* all attribute options from sequelize are valid as props of object arg passed to column! */
  @Column({ ...attributes.id })
  id: number;

  // @AllowNull(false)
  // @Unique(true)
  // @Length({ min: 3, max: length.max })
  // @Column(DataType.STRING)
  @Column({ ...attributes.username })
  username: string;

  // @AllowNull(false)
  // @Length({ min: length.password.min })
  // @Column(DataType.STRING)
  @Column({ ...attributes.password })
  password: string;

  /* ...ERROR [ExceptionHandler] Values for ENUM have not been defined.
  Error: Values for ENUM have not been defined. ...
  Cause: @Column(DataType.ENUM<InterfaceName>). It must be a fn. call passing default value as arg */
  // @AllowNull(false)
  // @Default(UserRole.USER)
  // @Column(DataType.ENUM<UserRole>(UserRole.USER))
  @Column({ ...attributes.role })
  role: AccountRole;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => PersonModel, 'personId')
  person: PersonModel;
}
