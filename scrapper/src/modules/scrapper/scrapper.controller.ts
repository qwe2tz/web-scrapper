import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { FlatService } from '../flat/flat.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('scrapper')
export class ScrapperController {
  constructor(
    @InjectQueue('scrapper') private readonly _scrapperQueue: Queue,
  ) {}

  @Get()
  async scrapeFlats() {
    console.log('Calling queue add');
    await this._scrapperQueue.add('scrapper-job', { test: 'test' });
    console.log('queue added');
    return 'OK';
  }

  // NOTE: We could have more scrapers, each having its own config,
  // method of scrapping, etc, so I decided to make it a module.
}
