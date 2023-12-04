import { FlatService } from './flat.service';
import { CreateFlatDto } from './dto/create-flat.dto';
export declare class FlatController {
    private readonly flatService;
    constructor(flatService: FlatService);
    create(createFlatDto: CreateFlatDto): Promise<import("./entities/flat.entity").Flat>;
    findAll(): Promise<import("./entities/flat.entity").Flat[]>;
}
