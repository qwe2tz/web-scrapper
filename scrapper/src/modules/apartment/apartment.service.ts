import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartment } from './entities/apartment.entity';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectRepository(Apartment)
    private readonly _apartmentRepository: Repository<Apartment>,
  ) {}

  create(createApartment: CreateApartmentDto): Promise<Apartment> {
    return this._apartmentRepository.save(createApartment);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Apartment>> {
    const queryBuilder =
      this._apartmentRepository.createQueryBuilder('apartment');

    queryBuilder
      .orderBy('apartment.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async deleteAll(): Promise<void> {
    await this._apartmentRepository.clear();
  }
}
