import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/create-flat.dto';
import { PageOptionsDto } from './dto/page-options.dto';

@Controller('flat')
export class FlatController {
  constructor(private readonly _flatService: FlatService) {}

  @Post()
  create(@Body() createFlatDto: CreateFlatDto) {
    return this._flatService.create(createFlatDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this._flatService.findAll(pageOptionsDto);
  }

  @Get('delete_all')
  deleteAll() {
    return this._flatService.deleteAll();
  }
}
