import { Module } from '@nestjs/common';

import { DbModule } from '../core/db/db.module';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { accountsProviders } from './accounts.providers';

@Module({
  imports: [DbModule],
  providers: [AccountsService, ...accountsProviders],
  controllers: [AccountsController],
})
export class AccountsModule {}
