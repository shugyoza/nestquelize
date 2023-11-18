import { Injectable, Inject } from '@nestjs/common';

import { ProvideToken } from '../shared/constants';

import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ProvideToken.ACCOUNTS_REPOSITORY)
    private readonly accountRepository: typeof AccountEntity
  ) {}

  async create(account: AccountDto): Promise<AccountEntity> {
    return await this.accountRepository.create<AccountEntity>(account);
  }

  async findAll(): Promise<AccountEntity[]> {
    return await this.accountRepository.findAll();
  }

  async findOneById(id: number): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne<AccountEntity>({
      where: {
        id,
      },
    });
  }

  async findOneByUsername(username: string): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne<AccountEntity>({
      where: {
        username,
      },
    });
  }

  async update(
    id: number,
    updates: { [key: string]: any }
  ): Promise<{ affectedCount: number; updatedAccount: AccountEntity }> {
    const [affectedCount, [updatedAccount]] =
      await this.accountRepository.update(
        { ...updates },
        { where: { id }, returning: true }
      );

    return { affectedCount, updatedAccount };
  }

  async delete(id: number) {
    return await this.accountRepository.destroy({ where: { id } });
  }
}
