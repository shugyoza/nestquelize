import { Module } from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { DbModule } from 'src/core/db/db.module';
import { accountsProviders } from './accounts.providers';

@Module({
  imports: [DbModule],
  providers: [AccountsService, ...accountsProviders],
  controllers: [AccountsController],
})
export class AccountsModule {}
