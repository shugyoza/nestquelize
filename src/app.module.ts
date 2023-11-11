import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './core/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // so that no need to import to other module that needs ConfigModule
      ignoreEnvFile: false,
      envFilePath: ['.env'], // can take multiple .env paths although by default, if undefined, looks for .env
      // load: [dbConfig, authConfig, whateverConfig],
    }),
    UsersModule,
    DbModule,
    PeopleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
