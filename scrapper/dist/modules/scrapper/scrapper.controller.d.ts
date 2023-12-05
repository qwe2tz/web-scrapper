import { ScrapperService } from './scrapper.service';
import { FlatService } from '../flat/flat.service';
export declare class ScrapperController {
    private readonly scrapperService;
    private readonly flatService;
    constructor(scrapperService: ScrapperService, flatService: FlatService);
    scrapeFlats(): Promise<void>;
}
