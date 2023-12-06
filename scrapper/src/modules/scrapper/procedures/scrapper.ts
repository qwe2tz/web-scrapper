import puppeteer, { Page } from 'puppeteer';
import { CreateFlatDto } from 'src/modules/flat/dto/create-flat.dto';
import { Scrapper } from 'src/modules/scrapper/interfaces';

export async function initScrapper(): Promise<Scrapper> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 766, height: 286 });

  return { page, browser };
}

export async function processFlatsPage(page: Page): Promise<CreateFlatDto[]> {
  try {
    const selector = '.property';

    const flats: CreateFlatDto[] = await page.$$eval(selector, (nodes) => {
      return nodes.map((node) => {
        const title = node.querySelector('.name').textContent;
        const titleSanitized = title.replace(/  |\r\n|\n|\r/gm, '');
        const location = node.querySelector('.locality').textContent;
        const titleItems = title.split(' ');
        const price = node.querySelector('.norm-price').textContent;
        const image_url = node.querySelector('img').getAttribute('src');

        return {
          title: titleSanitized,
          location,
          size:
            titleItems[titleItems.length - 2] +
            titleItems[titleItems.length - 1],
          price,
          image_url,
        };
      });
    });

    return flats;
  } catch (error) {
    console.error('Error while scraping job listings:', error);
  }
}
