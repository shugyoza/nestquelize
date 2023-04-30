import { Injectable } from '@nestjs/common';
import { Cat } from 'src/interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  addCat(cat: Cat) {
    this.cats.push(cat);
  }

  findCats(): Cat[] {
    return this.cats;
  }
}
