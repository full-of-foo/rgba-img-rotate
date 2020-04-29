declare class PixelArrayRotator {
    pixelArray: Array<any>;
    width: number;
    heigth: number;
    constructor(data: Array<any>, w: number, h: number);
    rotate(): Array<any>;
}
declare class ImageDataRotator {
    static rotate(image: ImageData, angle: number): ImageData;
}
export { PixelArrayRotator, ImageDataRotator };
