import { ImageDataRotator, PixelArrayRotator } from '../src/index';
import 'puppeteer';
import 'expect-puppeteer';
import 'jest-environment-puppeteer';

describe('PixelArrayRotator#rotate', () => {
  // BB
  // WW
  // WW
  const arr = [
    0,
    0,
    0,
    255,
    0,
    0,
    0,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
  ];
  // BWW
  // BWW
  const arr2 = [
    0,
    0,
    0,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    0,
    0,
    0,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
    255,
  ];

  it('should return a rotated-rightwards array', async () => {
    const rotator = new PixelArrayRotator(arr, 2, 3);
    expect(rotator.rotate()).toEqual(arr2);
  });
});

describe('ImageDataRotator#rotate', () => {
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

    expect(ImageDataRotator.rotate(image, angle)).not.toBeNull();
  });
});
