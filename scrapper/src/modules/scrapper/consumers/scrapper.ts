import { Processor, Process } from '@nestjs/bull';
import { ScrapperService } from '../scrapper.service';

@Processor('scrapper')
export class ScrapperConsumer {
  constructor(private readonly scrapperService: ScrapperService) {}

  // NOTE: Maybe I should move this to separate consumers files...
  @Process('scrapper-job')
  async scrapeFlats() {
    // this.scrapperService.scrapeFlats();
    console.log('Trigger scrapping');
  }
}
