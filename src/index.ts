class PixelArrayRotator {
  pixelArray: Array<any>;
  width: number;
  heigth: number;

  constructor(data: Array<number>, w: number, h: number) {
    this.pixelArray = data;
    this.width = w;
    this.heigth = h;
  }

  getPixelStartIndexForCoord(x: number, y: number) {
    return (x + y * this.width) * 4;
  }

  private rotate90(): Array<number> {
    let index;
    const rotatedArray = [];
    console.log(this.pixelArray, this.width, this.heigth);

    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.heigth; y += 1) {
        index = this.getPixelStartIndexForCoord(x, y);
        rotatedArray.push(this.pixelArray[index]);
        rotatedArray.push(this.pixelArray[index + 1]);
        rotatedArray.push(this.pixelArray[index + 2]);
        rotatedArray.push(this.pixelArray[index + 3]);
      }
    }

    console.log(rotatedArray);
    return rotatedArray;
  }

  private rotate180(): Array<number> {
    // TODO: implement
    return this.pixelArray;
  }

  private rotate270(): Array<number> {
    // TODO: implement
    return this.pixelArray;
  }

  /**
   * Rotates the given one-dimensional array by the given right angle in degrees.
   * Degrees must be a multiple of 90. Returns the original input if told to
   * rotate by 0 or 360 degrees.
   */
  rotate(degrees = 90): Array<number> {
    if (degrees % 90 !== 0) {
      throw new Error('Invalid input; degrees must be a multiple of 90');
    }
    const angle = ((degrees % 360) + 360) % 360;

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
    console.log('called with angle: ', angle);
    return image;
  }
}

export { PixelArrayRotator, ImageDataRotator };
