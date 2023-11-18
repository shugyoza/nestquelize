import { AccountRole } from 'src/core/db/models/account.model';
import { AccountEntity } from '../account.entity';

export class AccountDto extends AccountEntity {
  id: number;
  username: string;
  password: string;
  role: AccountRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
