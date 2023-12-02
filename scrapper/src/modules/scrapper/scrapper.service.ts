import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import puppeteer from 'puppeteer';

@Injectable()
export class ScrapperService {
  @Cron(CronExpression.EVERY_HOUR)
  async scrapeFlats() {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    try {
      await page.goto('https://www.sreality.cz/en/search/for-sale/apartments');

      const flats = await page.$$eval('.dir-property-list', (elements) => {
        return elements.slice(0, 10).map((element) => {
          return element.textContent;
        });
      });

      console.log('Flats Titles:', flats);
    } catch (error) {
      console.error('Error while scraping job listings:', error);
    } finally {
      await browser.close();
    }
  }
}
