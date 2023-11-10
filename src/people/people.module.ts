import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { Person } from 'src/entity/person.entity';

@Module({
  imports: [],
  controllers: [PeopleController],
  providers: [PeopleService],
  exports: [],
})
export class PeopleModule {}
