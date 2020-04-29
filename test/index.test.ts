import { PixelArrayRotator } from '../src/index';

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

const blackPixel = [0, 0, 0, 255];
const whitePixel = [255, 255, 255, 255];

const assertBlackPixel = (pixel: Array<any>) =>
  expect(pixel).toEqual(blackPixel);
const assertWhitePixel = (pixel: Array<any>) =>
  expect(pixel).toEqual(whitePixel);

describe('PixelArrayRotator', () => {
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

  const browserRotate = async function(
    pixelArray: any,
    width: number,
    height: number,
    degree: number
  ) {
    return page.evaluate(
      (pixelArr: any, w: number, h: number, d: number) => {
        const data: Uint8ClampedArray = new Uint8ClampedArray(pixelArr);
        const image = new window.ImageData(data, w, h);
        // @ts-ignore
        const rotatedImage = rotator.ImageDataRotator.rotate(image, d);

        return {
          pixelArray: Array.from(rotatedImage.data),
          height: rotatedImage.rotatedHeigth,
          width: rotatedImage.rotatedWidth,
        };
      },
      pixelArray,
      width,
      height,
      degree
    );
  };

  beforeAll(async () => {
    page = await browser.newPage();
    await page.addScriptTag({ path: './dist/rotator.umd.development.js' });
  });

  afterAll(async () => page.close());

  it('should return a rotated-rightwards array', async () => {
    const result = await browserRotate(arr, 2, 3, 90);

    expect(result.pixelArray).toEqual(arr2);
  });
});
