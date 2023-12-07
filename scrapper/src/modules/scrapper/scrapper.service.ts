import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ApartmentService } from '../apartment/apartment.service';
import { initScrapper, processApartmentPage } from './procedures/scrapper';
import { CreateApartmentDto } from '../apartment/dto/create-apartment.dto';
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
    private readonly _apartmentService: ApartmentService,
    @Inject(CACHE_MANAGER) private _cacheManager: Cache,
  ) {}

  async scrapeFlats() {
    const requiredSelector = '.dir-property-list';
    const { page, browser } = await initScrapper();

    const iterations = NUM_OF_ITEMS / ITEMS_PER_PAGE + 1;

    try {
      // Just set it to 100s, or ttl infinite (not sure why 0 does not work)
      await this._cacheManager.set(SCRAPPER_PROGRESS, true, 100000);

      for (let index = 1; index < iterations; index++) {
        // Set current page
        await this._cacheManager.set(SCRAPPER_PAGE, index, 100000);

        const webpage = FLATS_WEB_PAGE + index;
        await page.goto(webpage, { timeout: 0 });
        await page.waitForSelector(requiredSelector);

        const apartments: CreateApartmentDto[] =
          await processApartmentPage(page);

        // Save flats to DB
        apartments.forEach((apartment) => {
          this._apartmentService.create(apartment);
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
    const status = await this._cacheManager.get(SCRAPPER_PROGRESS);
    const currentPage = await this._cacheManager.get(SCRAPPER_PAGE);

    return {
      status: status,
      current_page: currentPage,
    };
  }
}
