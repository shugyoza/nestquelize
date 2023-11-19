import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(): Promise<AccountEntity[]> {
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

  @Get(':username')
  async findOneByUsername(
    @Param('username') username: string
  ): Promise<AccountEntity> {
    const account = await this.accountsService.findOneByUsername(username);

    if (!account) {
      throw new NotFoundException('This account does not exist.');
    }

    return account;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() accountUpdate: AccountDto
  ): Promise<AccountEntity> {
    const { affectedCount, updatedAccount } = await this.accountsService.update(
      id,
      accountUpdate
    );

    if (!affectedCount) {
      throw new NotFoundException('This account does not exist');
    }

    return updatedAccount;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const deleted = await this.accountsService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException('This account does not exist');
    }

    return 'Successfully deleted';
  }
}
