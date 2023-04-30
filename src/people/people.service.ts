import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/entity/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.peopleRepository.find();
  }

  findOne(id: number): Promise<Person | null> {
    return this.peopleRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.peopleRepository.delete(id);
  }
}
