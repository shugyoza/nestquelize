import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppDataSource } from './data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { DogsModule } from './dogs/dogs.module';
import { PeopleModule } from './people/people.module';
import { Person } from './entity/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'database',
      synchronize: true,
      logging: true,
      entities: [Person],
      subscribers: [],
      migrations: [],
    }),
    PeopleModule,
    CatsModule,
    AdminModule,
    DogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
