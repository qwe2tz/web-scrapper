import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { FlatService } from '../flat/flat.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(
    private readonly scrapperService: ScrapperService,
    private readonly flatService: FlatService,
  ) {}

  // Just one method -> scrapeFlats
  @Get()
  scrapeFlats() {
    return this.scrapperService.scrapeFlats();
  }

  // NOTE: We could have more scrapers, aeach having its own config,
  // method of scrapping, etc, so I decided to make it a module
}
