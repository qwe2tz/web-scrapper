import { CreateFlatDto } from './dto/create-flat.dto';
import { Repository } from 'typeorm';
import { Flat } from './entities/flat.entity';
export declare class FlatService {
    private readonly flatRepository;
    constructor(flatRepository: Repository<Flat>);
    create(createFlat: CreateFlatDto): Promise<Flat>;
    findAll(): Promise<Flat[]>;
    findOne(title: string): Promise<Flat>;
    remove(id: number): Promise<{
        affected?: number;
    }>;
}
