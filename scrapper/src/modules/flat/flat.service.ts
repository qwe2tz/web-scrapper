import { Injectable } from '@nestjs/common';
import { CreateFlatDto } from './dto/create-flat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from './entities/flat.entity';
import { PageOptionsDto } from './dto/page-options.dto';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';

@Injectable()
export class FlatService {
  constructor(
    @InjectRepository(Flat) private readonly _flatRepository: Repository<Flat>,
  ) {}

  create(createFlat: CreateFlatDto): Promise<Flat> {
    return this._flatRepository.save(createFlat);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Flat>> {
    const queryBuilder = this._flatRepository.createQueryBuilder('flat');

    queryBuilder
      .orderBy('flat.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async deleteAll(): Promise<void> {
    await this._flatRepository.clear();
  }
}
