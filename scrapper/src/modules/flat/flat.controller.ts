import { Controller, Get, Post, Body } from '@nestjs/common';
import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/create-flat.dto';

@Controller('flat')
export class FlatController {
  constructor(private readonly flatService: FlatService) {}

  @Post()
  create(@Body() createFlatDto: CreateFlatDto) {
    return this.flatService.create(createFlatDto);
  }

  @Get()
  findAll() {
    return this.flatService.findAll();
  }

  @Get('delete_all')
  deleteAll() {
    return this.flatService.deleteAll();
  }
}
