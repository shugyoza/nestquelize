import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts.module';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';

@Module({
  imports: [AccountsModule],
  providers: [AccountsService],
  controllers: [AccountsController],
})
export class AccountsHttpModule {}
