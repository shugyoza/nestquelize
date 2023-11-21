import { Module } from '@nestjs/common';

import { DbModule } from '../core/db/db.module';
import { AccountsService } from './accounts.service';
import { accountsProviders } from './accounts.providers';

@Module({
  imports: [DbModule],
  providers: [AccountsService, ...accountsProviders],
})
export class AccountsModule {}
