import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(
    @InjectQueue('scrapper') private readonly _scrapperQueue: Queue,
    private readonly _scrapingService: ScrapperService,
  ) {}

  @Get('start')
  @HttpCode(HttpStatus.OK)
  async scrapeFlats() {
    await this._scrapperQueue.add('scrapper-job');
    return { response: 'OK' };
  }

  @Get('status')
  @HttpCode(HttpStatus.OK)
  async getScrapingStatus() {
    return { data: await this._scrapingService.scrapingStatus() };
  }
}
