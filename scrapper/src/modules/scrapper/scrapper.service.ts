import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { FlatService } from '../flat/flat.service';
import { initScrapper, processFlatsPage } from './procedures/scrapper';
import { CreateFlatDto } from '../flat/dto/create-flat.dto';
import {
  NUM_OF_ITEMS,
  ITEMS_PER_PAGE,
  FLATS_WEB_PAGE,
  SCRAPE_CACHE_PROGRESS_ID,
} from './config';

@Injectable()
export class ScrapperService {
  constructor(
    private readonly _flatService: FlatService,
    @Inject(CACHE_MANAGER) private _cacheManager: Cache,
  ) {}

  async scrapeFlats() {
    const requiredSelector = '.dir-property-list';
    const { page, browser } = await initScrapper();

    const iterations = NUM_OF_ITEMS / ITEMS_PER_PAGE + 1;

    try {
      await this._cacheManager.set('scrapper_in_progress', true, 100000);

      for (let index = 1; index < iterations; index++) {
        const webpage = FLATS_WEB_PAGE + index;
        await page.goto(webpage);
        await page.waitForSelector(requiredSelector);

        const flats: CreateFlatDto[] = await processFlatsPage(page);

        // Save flats to DB
        flats.forEach((flat) => {
          this._flatService.create(flat);
        });
      }
    } catch (error) {
      console.error('Error while scraping job listings:', error);
    } finally {
      browser.close();
      console.log('Done ...');
      console.log('REmoving cache key...');
      await this._cacheManager.set('scrapper_in_progress', false, 100000);
    }
  }

  async scrapingStatus() {
    return await this._cacheManager.get('scrapper_in_progress');
  }
}
