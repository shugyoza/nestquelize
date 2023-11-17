import { AccountRole } from 'src/core/db/models/account.model';
import { AccountEntity } from '../account.entity';

export class AccountDto extends AccountEntity {
  readonly id: number;
  readonly username: string;
  readonly password: string;
  readonly role: AccountRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
