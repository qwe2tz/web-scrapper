import puppeteer, { Page } from 'puppeteer';
import { CreateApartmentDto } from 'src/modules/apartment/dto/create-apartment.dto';
import { Scrapper } from 'src/modules/scrapper/interfaces';

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

    const apartments: CreateApartmentDto[] = await page.$$eval(
      selector,
      (nodes) => {
        return nodes.map((node) => {
          const title = node.querySelector('.name').textContent;

          const titleSanitized = title.replace(/  |\r\n|\n|\r/gm, '');
          const location = node.querySelector('.locality').textContent;
          const titleItems = title.split(' ');
          const price = node.querySelector('.norm-price').textContent;
          const image_url = node.querySelector('img').getAttribute('src');

          console.log('TITLE: ', title);
          console.log('Title sanitized ', titleSanitized);
          console.log('Title items ', titleItems);
          console.log(
            'Title items ',
            titleItems[titleItems.length - 2] +
              '  ' +
              titleItems[titleItems.length - 1],
          );

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
      },
    );

    return apartments;
  } catch (error) {
    console.error('Error while scraping apartments listings:', error);
  }
}
