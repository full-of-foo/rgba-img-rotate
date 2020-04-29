declare class PixelArrayRotator {
    pixelArray: Array<any>;
    width: number;
    heigth: number;
    constructor(data: Array<number>, w: number, h: number);
    getPixelStartIndexForCoord(x: number, y: number): number;
    private rotate90;
    private rotate180;
    private rotate270;
    /**
     * Rotates the given one-dimensional array by the given right angle in degrees.
     * Degrees must be a multiple of 90. Returns the original input if told to
     * rotate by 0 or 360 degrees.
     */
    rotate(degrees?: number): Array<number>;
}
declare class ImageDataRotator {
    static rotate(image: ImageData, angle: number): ImageData;
}
export { PixelArrayRotator, ImageDataRotator };
