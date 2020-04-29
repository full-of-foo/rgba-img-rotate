import { ImageDataRotator, PixelArrayRotator } from '../src/index';

const blackPixel = [0, 0, 0, 255];
const whitePixel = [255, 255, 255, 255];

const assertBlackPixel = (pixel: Array<number>) =>
  expect(pixel).toEqual(blackPixel);
const assertWhitePixel = (pixel: Array<number>) =>
  expect(pixel).toEqual(whitePixel);

describe('PixelArrayRotator', () => {
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

  it('#getPixelStartIndexForCoord should return the starting index of the pixel at (X, Y)', async () => {
    const rotator = new PixelArrayRotator(arr, 2, 3);
    const rotator2 = new PixelArrayRotator(arr2, 3, 3);

    let i = rotator.getPixelStartIndexForCoord(0, 0);
    const firstPixel = [
      rotator.pixelArray[i],
      rotator.pixelArray[i + 1],
      rotator.pixelArray[i + 2],
      rotator.pixelArray[i + 3],
    ];
    let i2 = rotator2.getPixelStartIndexForCoord(0, 0);
    const firstPixel2 = [
      rotator2.pixelArray[i2],
      rotator2.pixelArray[i2 + 1],
      rotator2.pixelArray[i2 + 2],
      rotator2.pixelArray[i2 + 3],
    ];

    assertBlackPixel(firstPixel);
    assertBlackPixel(firstPixel2);

    i = rotator.getPixelStartIndexForCoord(0, 1);
    const secondRowFirstPixel = [
      rotator.pixelArray[i],
      rotator.pixelArray[i + 1],
      rotator.pixelArray[i + 2],
      rotator.pixelArray[i + 3],
    ];
    i2 = rotator2.getPixelStartIndexForCoord(0, 1);
    const secondRowFirstPixel2 = [
      rotator2.pixelArray[i2],
      rotator2.pixelArray[i2 + 1],
      rotator2.pixelArray[i2 + 2],
      rotator2.pixelArray[i2 + 3],
    ];

    assertWhitePixel(secondRowFirstPixel);
    assertBlackPixel(secondRowFirstPixel2);
  });

  it('#rotate should return a rotated-rightwards array', async () => {
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
