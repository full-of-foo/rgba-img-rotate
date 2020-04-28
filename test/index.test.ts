import Rotator from '../src/index';
import 'puppeteer';
import 'expect-puppeteer';
import 'jest-environment-puppeteer';

describe('Rotator#rotate', () => {
  let page: any;
  beforeAll(async () => {
    page = await browser.newPage();
  });

  afterAll(async () => page.close());

  it('should return', async () => {
    const image = await page.evaluate(() => {
      const data: Uint8ClampedArray = new Uint8ClampedArray(40000);
      return new window.ImageData(data, 200, 50);
    });
    const angle = 90;

    expect(Rotator.rotate(image, angle)).not.toBeNull();
  });
});
