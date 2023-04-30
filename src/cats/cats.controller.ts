import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post('httpcode')
  @Header('Cache-Control', 'none') // add custom response header
  @HttpCode(204) // specify custom response code
  addNewCatWithCode() {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findWildcards() {
    return 'this route uses a wildcard';
  }

  @Post('add')
  async addNewCat(@Body() createCatDto: CreateCatDto) {
    // return 'This action adds a new cat';
    return this.catsService.addCat(createCatDto);
  }

  @Get()
  findCats(): string {
    return 'This action returns all cats';
  }

  @Get('nestjs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' }; // dynamic url return pass an object with {url: string, statusCode: number}
    }
  }

  @Get('promise')
  async getPromise(): Promise<any[]> {
    // return [];
    return this.catsService.findCats();
  }

  @Get('observable')
  getObservable(): Observable<any[]> {
    return of([]);
  }

  //   @Get(':id')
  //   findOne(@Param() params: any): string {  // dynamic params fist approach
  //     console.log(params.id);
  //     return `This action calls findOne() to returns a #${params.id} cat`;
  //   }

  @Get(':id')
  findById(@Param('id') id: string): string {
    // dynamic params, second approach
    return `This action calls findById() to return a #${id} cats`;
  }
}
