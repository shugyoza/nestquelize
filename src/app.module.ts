import { Module } from '@nestjs/common';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AdminModule } from './admin/admin.module';
import { DogsModule } from './dogs/dogs.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CatsModule, AdminModule, DogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
