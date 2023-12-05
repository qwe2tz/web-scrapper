import { Browser, Page } from 'puppeteer';

export interface Scrapper {
  page: Page;
  browser: Browser;
}
