import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entity/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person])], // this enable to injectRepository in service
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [TypeOrmModule], // needed if we want to use the repo outside of this module
})
export class PeopleModule {}
