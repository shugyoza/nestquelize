import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

import { AccountRole } from '../../core/db/models/account.model';
import { AccountEntity } from '../account.entity';

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

  confirmPassword: string;
}

export class LoginDTO {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export class RegisterDTO extends LoginDTO {
  readonly confirmPassword: string;
}

export class AccountDTO extends PartialType(LoginDTO) {
  readonly id: number;
  readonly role: AccountRole;
}

export class QueryAccount {
  where: {
    id?: number;
    email?: string;
    username?: string;
  };
}

export class PasswordlessAccountEntity extends PartialType(AccountEntity) {}
export class PartialAccountDTO extends PartialType(AccountDTO) {}
export class PartialLoginDTO extends PartialType(LoginDTO) {}
