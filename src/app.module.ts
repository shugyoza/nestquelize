import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './account/accounts.module';
import { DbModule } from './core/db/db.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so that no need to import to other module that needs ConfigModule
      ignoreEnvFile: false,
      envFilePath: ['.env'], // can take multiple .env paths although by default, if undefined, looks for .env
      // load: [dbConfig, authConfig, whateverConfig],
    }),
    AccountsModule,
    DbModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
