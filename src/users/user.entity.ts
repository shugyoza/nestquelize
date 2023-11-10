/* typeorm's entity === sequelize' model
nestjs has closer familiarity with typeorm, thus using typeorm's terms */
import {
  Column,
  Model,
  Table,
  DataType,
  AllowNull,
  Unique,
  AutoIncrement,
  Default,
  Length,
} from 'sequelize-typescript';

import { length } from 'src/shared/constants';

enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

/*
Order of decorators matter. @Column must be last
Error, e.g: 
'...
throw new Error(`@Column annotation is missing for "${propertyName}" of class "${target.constructor.name}"` +
Error: @Column annotation is missing for "password" of class "User" or annotation order is wrong.
...
*/
@Table
export class User extends Model {
  /*
  err: '...
  ERROR [ExceptionHandler] A column called 'id' was added to the attributes of 'Users' but not marked with 'primaryKey: true'
  Error: A column called 'id' was added to the attributes of 'Users' but not marked with 'primaryKey: true' ...
  cause: should pass a 'primaryKey: true' in an object to @Column
  */
  @AutoIncrement
  @Column({ primaryKey: true, type: DataType.INTEGER })
  id: number;

  @AllowNull(false)
  @Unique(true)
  @Length({
    min: length.email.min,
    max: length.email.max,
  })
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Unique(true)
  @Length({ min: 3, max: length.max })
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Length({ min: length.password.min })
  @Column(DataType.STRING)
  password: string;

  /*
  err: ' 
  ...
  ERROR [ExceptionHandler] Values for ENUM have not been defined.
  Error: Values for ENUM have not been defined.
  ...'
  Cause: @Column(DataType.ENUM<InterfaceName>). It is supposed to be a function call passing default value as arg
  */
  @Default(UserRole.USER)
  @Column(DataType.ENUM<UserRole>(UserRole.USER))
  role: UserRole;
}
