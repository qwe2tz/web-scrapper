import puppeteer, { Page } from 'puppeteer';
import { CreateApartmentDto } from 'src/modules/apartment/dto/create-apartment.dto';
import { Scrapper } from 'src/modules/scrapper/interfaces';
import { BASE_URL } from '../config';

export async function initScrapper(): Promise<Scrapper> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 766, height: 286 });

  return { page, browser };
}

export async function processApartmentPage(
  page: Page,
): Promise<CreateApartmentDto[]> {
  try {
    const selector = '.property';

    const apartments = await page.$$eval(selector, (nodes) => {
      return nodes.map((node) => {
        const title = node.querySelector('.name').textContent;
        const ap_url = node.querySelector('.title').getAttribute('href');
        const apartment_url = 'https://www.sreality.cz' + ap_url;

        const titleSanitized = title.replace(/  |\r\n|\n|\r/gm, '');
        const location = node.querySelector('.locality').textContent;
        const titleItems = titleSanitized.split(' ');
        const price = node.querySelector('.norm-price').textContent;
        const image_url = node.querySelector('img').getAttribute('src');

        let size = Number(titleItems[titleItems.length - 1][0])
          ? titleItems[titleItems.length - 1]
          : titleItems[titleItems.length - 2];
        const nBSSplit = size.split(/\s|&nbsp;/g);
        size = nBSSplit.length === 3 ? nBSSplit[1] + ' ' + nBSSplit[2] : size;

        return {
          title: titleSanitized,
          apartment_url,
          location,
          size,
          price,
          image_url,
          test: titleItems,
        };
      });
    });

    return apartments;
  } catch (error) {
    console.error('Error while scraping apartments listings:', error);
  }
}
