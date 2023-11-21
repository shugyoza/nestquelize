import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AccountsService } from '../../account/accounts.service';
import { AccountsModule } from '../../account/accounts.module';
import { accountsProviders } from '../../account/accounts.providers';
import { DbModule } from '../db/db.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    DbModule,
    PassportModule,
    AccountsModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION }, // in seconds
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AccountsService,
    ...accountsProviders,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
