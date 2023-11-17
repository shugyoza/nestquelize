import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { AccountEntity } from './account.entity';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll() {
    return await this.accountsService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<AccountEntity> {
    const account = await this.accountsService.findOneById(id);

    if (!account) {
      throw new NotFoundException('This account does not exist.');
    }

    return account;
  }
}
