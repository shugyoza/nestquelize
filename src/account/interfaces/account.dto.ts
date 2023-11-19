import { AccountRole } from '../../core/db/models/account.model';
import { AccountEntity } from '../account.entity';

import { IsEmail, IsNotEmpty, Min, Contains } from 'class-validator';

export class AccountDto {
  readonly id: number;
  readonly username: string;
  readonly password: string;
  readonly role: AccountRole;
}

export class FindAccount {
  where: {
    id?: number;
    email?: string;
    username?: string;
  };
}

export class RegisterAccount {
  id?: number;

  @IsNotEmpty()
  @Min(6)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Min(6)
  email: string;

  @IsNotEmpty()
  @Min(8)
  password: string;
}
