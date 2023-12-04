import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { FlatService } from '../flat/flat.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('scrapper')
export class ScrapperController {
  constructor(
    private readonly scrapperService: ScrapperService,
    private readonly flatService: FlatService,
    @InjectQueue('scrapper') private readonly scrapperQueue: Queue,
  ) {}

  // Just one method -> scrapeFlats
  @Get()
  async scrapeFlats() {
    await this.scrapperQueue.add('scrapper-job', {});
  }

  // return this.scrapperService.scrapeFlats();
  // NOTE: We could have more scrapers, aeach having its own config,
  // method of scrapping, etc, so I decided to make it a module
}
