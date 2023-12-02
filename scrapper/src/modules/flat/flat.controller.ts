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

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.FlatService.findOne(+id);
  // }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateFlatDto: UpdateFlatDto) {
  //     return this.FlatService.update(+id, updateFlatDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.FlatService.remove(+id);
  //   }
  // }
}
