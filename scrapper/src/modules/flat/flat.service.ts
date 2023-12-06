import { Injectable } from '@nestjs/common';
import { CreateFlatDto } from './dto/create-flat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from './entities/flat.entity';

@Injectable()
export class FlatService {
  constructor(
    @InjectRepository(Flat) private readonly flatRepository: Repository<Flat>,
  ) {}

  create(createFlat: CreateFlatDto): Promise<Flat> {
    return this.flatRepository.save(createFlat);
  }

  findAll(): Promise<Flat[]> {
    return this.flatRepository.find();
  }

  findOne(title: string): Promise<Flat> {
    return this.flatRepository.findOneBy({ title: title });
  }

  async deleteAll(): Promise<void> {
    await this.flatRepository.clear();
  }
}
