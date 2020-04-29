class PixelArrayRotator {
  pixelArray: Array<any>;
  width: number;
  heigth: number;

  constructor(data: Array<any>, w: number, h: number) {
    this.pixelArray = data;
    this.width = w;
    this.heigth = h;
  }

  // Assumes just 90 from (0,0)
  rotate(): Array<any> {
    let index;
    const rotatedArray = [];
    console.log(this.pixelArray, this.width, this.heigth);

    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.heigth; y += 1) {
        index = (x + y * this.width) * 4;
        rotatedArray.push(this.pixelArray[index]);
        rotatedArray.push(this.pixelArray[index + 1]);
        rotatedArray.push(this.pixelArray[index + 2]);
        rotatedArray.push(this.pixelArray[index + 3]);
      }
    }

    console.log(rotatedArray);
    return rotatedArray;
  }
}

class ImageDataRotator {
  static rotate(image: ImageData, angle: number): ImageData {
    console.log('called with angle: ', angle);
    return image;
  }
}

export { PixelArrayRotator, ImageDataRotator };
