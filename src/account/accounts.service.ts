import { Injectable, Inject } from '@nestjs/common';

import { ProvideToken } from 'src/shared/constants';

import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';

/*
Got compile error on the @Injectable decorator, i.e.: 
'Unable to resolve signature of class decorator when called as an expression.
The runtime will invoke the decorator with 2 arguments, but the decorator expects 1.ts(1238)'
Resolved by changing the 'target' in tsconfig.json from '2017' to '2016'.
Ref.: https://stackoverflow.com/questions/36446480/typescript-decorator-reports-unable-to-resolve-signature-of-class-decorator-whe
*/
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
    // Promise<UserModel[]> {
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
