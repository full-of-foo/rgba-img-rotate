declare let ImageData: {
  prototype: ImageData;
  new (width: number, height: number): ImageData;
  new (array: Uint8ClampedArray, width: number, height?: number): ImageData;
};

class PixelArrayRotator {
  pixelArray: Array<Uint8Array>;
  width: number;
  heigth: number;
  rotatedWidth = 0;
  rotatedHeigth = 0;

  constructor(data: Array<any>, w: number, h: number) {
    this.pixelArray = data as Uint8Array[];
    this.width = w;
    this.heigth = h;
  }

  getPixelStartIndexForCoord(x: number, y: number) {
    return (x + y * this.width) * 4;
  }

  // Inspired from source: https://javascriptinfo.com/view/1970504/rotating-a-1d-rgba-array
  private rotate90(): Array<Uint8Array> {
    let index: number;
    const rotatedArray = [];

    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.heigth; y += 1) {
        index = this.getPixelStartIndexForCoord(x, y);
        rotatedArray.push(this.pixelArray[index]);
        rotatedArray.push(this.pixelArray[index + 1]);
        rotatedArray.push(this.pixelArray[index + 2]);
        rotatedArray.push(this.pixelArray[index + 3]);
      }
    }

    return rotatedArray;
  }

  private rotate180(): Array<Uint8Array> {
    // TODO: implement and test (rotate90 twice to begin with)
    return this.pixelArray;
  }

  private rotate270(): Array<Uint8Array> {
    // TODO: implement and test (rotate90 thrice to begin with)
    return this.pixelArray;
  }

  /**
   * Rotates the given one-dimensional array by the given right angle in degrees.
   * Degrees must be a multiple of 90. Returns the original input if told to
   * rotate by 0 or 360 degrees.
   */
  rotate(degrees = 90): Array<Uint8Array> {
    if (degrees % 90 !== 0) {
      throw new Error('Invalid input; degrees must be a multiple of 90');
    }
    const angle = ((degrees % 360) + 360) % 360;

    if (angle === 0 || angle === 180 || angle === 360) {
      this.rotatedWidth = this.width;
      this.rotatedHeigth = this.heigth;
    } else if (angle === 90 || angle === 270) {
      this.rotatedWidth = this.heigth;
      this.rotatedHeigth = this.width;
    }

    if (angle === 90) {
      return this.rotate90();
    }
    if (angle === 180) {
      return this.rotate180();
    }
    if (angle === 270) {
      return this.rotate270();
    }

    return this.pixelArray;
  }
}

class ImageDataRotator {
  static rotate(image: ImageData, angle: number): ImageData {
    const pixelArrayRotator = new PixelArrayRotator(
      Array.from(image.data),
      image.width,
      image.height
    );
    const rotatedArray = new Uint8ClampedArray(
      pixelArrayRotator.rotate(angle) as Array<any>
    );

    return new ImageData(
      rotatedArray,
      pixelArrayRotator.rotatedWidth,
      pixelArrayRotator.rotatedHeigth
    );
  }
}

export { PixelArrayRotator, ImageDataRotator };
