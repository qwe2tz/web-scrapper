import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { PageOptionsDto } from './dto/page-options.dto';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly _apartmentService: ApartmentService) {}

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this._apartmentService.create(createApartmentDto);
  }

  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this._apartmentService.findAll(pageOptionsDto);
  }

  @Get('delete_all')
  deleteAll() {
    return this._apartmentService.deleteAll();
  }
}
