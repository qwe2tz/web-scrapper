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
  SCRAPPER_PROGRESS,
  SCRAPPER_PAGE,
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
      // Just set it to 100s, or ttl infinite
      await this._cacheManager.set(SCRAPPER_PROGRESS, true, 100000);

      for (let index = 1; index < iterations; index++) {
        // Set current page
        await this._cacheManager.set(SCRAPPER_PAGE, index, 100000);

        const webpage = FLATS_WEB_PAGE + index;
        await page.goto(webpage, { timeout: 0 });
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
      await this._cacheManager.set(SCRAPPER_PROGRESS, false, 100000);
    }
  }

  async scrapingStatus() {
    return {
      status: await this._cacheManager.get(SCRAPPER_PROGRESS),
      current_page: await this._cacheManager.get(SCRAPPER_PAGE),
    };
  }
}
