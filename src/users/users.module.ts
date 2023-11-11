import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbModule } from 'src/core/db/db.module';
import { usersProviders } from './users.providers';

@Module({
  imports: [DbModule],
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
})
export class UsersModule {}
