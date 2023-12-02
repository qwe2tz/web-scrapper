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
    const flat: Flat = new Flat();
    flat.title = createFlat.title;
    flat.image_url = createFlat.image_url;
    return this.flatRepository.save(flat);
  }

  findAll(): Promise<Flat[]> {
    return this.flatRepository.find();
  }

  findOne(title: string): Promise<Flat> {
    return this.flatRepository.findOneBy({ title: title });
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.flatRepository.delete(id);
  }
}
