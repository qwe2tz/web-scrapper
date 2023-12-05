import { Processor, Process } from '@nestjs/bull';
import { ScrapperService } from './scrapper.service';

@Processor('scrapper')
export class ScrapperProcessor {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Process('scrapper-job')
  async scrapeFlats() {
    console.log('Website scrapping started..');
    this.scrapperService.scrapeFlats();
    console.log('compleasdted!!');
  }
}
