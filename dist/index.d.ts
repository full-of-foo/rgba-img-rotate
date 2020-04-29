declare class PixelArrayRotator {
    pixelArray: Array<any>;
    width: number;
    heigth: number;
    constructor(data: Array<number>, w: number, h: number);
    getPixelStartIndexForCoord(x: number, y: number): number;
    rotate(): Array<number>;
}
declare class ImageDataRotator {
    static rotate(image: ImageData, angle: number): ImageData;
}
export { PixelArrayRotator, ImageDataRotator };
