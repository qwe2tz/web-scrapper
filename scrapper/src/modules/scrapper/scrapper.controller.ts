import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  // Just one method -> scrapeFlats
  @Get()
  scrapeFlats() {
    return this.scrapperService.scrapeFlats();
  }

  // NOTE: We could have more scrapers, each having its own config,
  // method of scrapping, etc, so I decided to make it a module
}
