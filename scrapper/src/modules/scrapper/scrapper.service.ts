import { Injectable } from '@nestjs/common';
import { FlatService } from '../flat/flat.service';
import { initScrapper, processFlatsPage } from './procedures/scrapper';
import { CreateFlatDto } from '../flat/dto/create-flat.dto';
import { NUM_OF_ITEMS, ITEMS_PER_PAGE } from './config';

@Injectable()
export class ScrapperService {
  constructor(private readonly flatService: FlatService) {}

  async scrapeFlats() {
    const requiredSelector = '.dir-property-list';

    const { page, browser } = await initScrapper();

    const iterations = NUM_OF_ITEMS / ITEMS_PER_PAGE + 1;

    try {
      for (let index = 1; index < iterations; index++) {
        const webpage =
          'https://www.sreality.cz/en/search/for-sale/apartments?page=' + index;
        await page.goto(webpage);
        await page.waitForSelector(requiredSelector);

        const flats: CreateFlatDto[] = await processFlatsPage(page);
        console.log('FLATS: ', flats);

        // Save flats to DB
        flats.forEach((flat) => {
          this.flatService.create(flat);
        });
      }
    } catch (error) {
      console.error('Error while scraping job listings:', error);
    } finally {
      browser.close();
    }
  }
}
