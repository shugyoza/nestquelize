import { Injectable, Inject } from '@nestjs/common';

import { ProvideToken } from '../shared/constants';
import { AccountEntity } from './account.entity';
import {
  AccountDTO,
  LoginDTO,
  PartialAccountDTO,
  QueryAccount,
} from './interfaces/account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ProvideToken.ACCOUNTS_REPOSITORY)
    private readonly accountRepository: typeof AccountEntity
  ) {}

  async create(account: LoginDTO): Promise<AccountEntity> {
    return await this.accountRepository.create<AccountEntity>(
      account as AccountEntity
    );
  }

  async findAll(): Promise<AccountEntity[]> {
    return await this.accountRepository.findAll();
  }

  public async findAccountById(id: number): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne<AccountEntity>({
      where: { id },
    });
  }

  public async findAccountByEmail(
    email: string
  ): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne<AccountEntity>({
      where: { email },
    });
  }

  public async findAccountByUsername(
    username: string
  ): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne<AccountEntity>({
      where: { username },
    });
  }

  async update(
    id: number,
    updates: PartialAccountDTO
  ): Promise<{ affectedCount: number; updatedAccount: AccountDTO }> {
    const [affectedCount, [updatedAccount]] =
      await this.accountRepository.update(
        { ...updates },
        { where: { id }, returning: true }
      );

    return { affectedCount, updatedAccount };
  }

  async delete(id: number): Promise<number> {
    return await this.accountRepository.destroy({ where: { id } });
  }

  private async findAccounts(
    where: QueryAccount
  ): Promise<AccountEntity | null> {
    return await this.accountRepository.findOne<AccountEntity>(where);
  }
}
