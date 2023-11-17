import { Injectable, Inject } from '@nestjs/common';

import { ProvideToken } from 'src/shared/constants';

import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ProvideToken.ACCOUNTS_REPOSITORY) // @Inject('ACCOUNTS_REPOSITORY')
    private readonly account: typeof AccountEntity
  ) {}

  async create(account: AccountDto): Promise<AccountEntity> {
    return await this.account.create<AccountEntity>(account);
  }

  async findAll(): Promise<AccountEntity[]> {
    return this.account.findAll();
  }

  async findOneById(id: number): Promise<AccountEntity | null> {
    return await this.account.findOne<AccountEntity>({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<AccountEntity | null> {
    return await this.account.findOne<AccountEntity>({
      where: {
        username,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const account = await this.findOneById(id);
    await account?.destroy();
  }
}
