import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateCateDto } from 'src/cats/create-cat.dto';

@Controller('dogs')
export class DogsController {
  @Get()
  getDogs(): string {
    return 'This action returns all dogs';
  }

  @Post()
  create(@Body() createCatDto: CreateCateDto) {
    return 'this action adds a new dog';
  }
}
