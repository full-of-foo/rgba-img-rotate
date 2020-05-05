enum Angles {
  None = 0,
  RhsOnce = 90,
  RhsTwice = 180,
  RhsTrice = 270,
  RhsFull = 360,
  LhsOnce = -90,
  LhsTwice = -180,
  LhsTrice = -270,
  LhsFull = -360,
}

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
    // TODO: validate number inputs (through types ideally)
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
      for (let y = this.heigth - 1; y >= 0; y -= 1) {
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
    // TODO: try reverse approach as something less naive
    const rotatedArray = this.rotate(90);
    return new PixelArrayRotator(
      rotatedArray,
      this.rotatedWidth,
      this.rotatedHeigth
    ).rotate(90);
  }

  private rotate270(): Array<Uint8Array> {
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

  /**
   * Rotates the given one-dimensional array by the given right angle in degrees.
   * Degrees must be a multiple of 90. Returns the original input if told to
   * rotate by 0 or 360 degrees.
   */
  rotate(degrees = 90): Array<Uint8Array> {
    if (!(degrees in Angles)) {
      throw new Error(
        `Invalid input; degrees must be in ${Object.values(Angles)}`
      );
    }

    if (
      degrees === Angles.None ||
      degrees === Angles.RhsTwice ||
      degrees === Angles.RhsFull
    ) {
      this.rotatedWidth = this.width;
      this.rotatedHeigth = this.heigth;
    } else if (degrees === Angles.RhsOnce || degrees === Angles.RhsTrice) {
      this.rotatedWidth = this.heigth;
      this.rotatedHeigth = this.width;
    }

    if (degrees === Angles.RhsOnce) {
      return this.rotate90();
    }
    if (degrees === Angles.RhsTwice) {
      return this.rotate180();
    }
    if (degrees === Angles.RhsTrice) {
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

export { Angles, PixelArrayRotator, ImageDataRotator };
