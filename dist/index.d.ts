declare enum Angles {
    None = 0,
    RhsOnce = 90,
    RhsTwice = 180,
    RhsTrice = 270,
    RhsFull = 360,
    LhsOnce = -90,
    LhsTwice = -180,
    LhsTrice = -270,
    LhsFull = -360
}
declare class PixelArrayRotator {
    pixelArray: Array<Uint8Array>;
    width: number;
    heigth: number;
    rotatedWidth: number;
    rotatedHeigth: number;
    constructor(data: Array<any>, w: number, h: number);
    getPixelStartIndexForCoord(x: number, y: number): number;
    private rotate90;
    private rotate180;
    private rotate270;
    /**
     * Rotates the given one-dimensional array by the given right angle in degrees.
     * Degrees must be a multiple of 90. Returns the original input if told to
     * rotate by 0 or 360 degrees.
     */
    rotate(degrees?: number): Array<Uint8Array>;
}
declare class ImageDataRotator {
    static rotate(image: ImageData, angle: number): ImageData;
}
export { Angles, PixelArrayRotator, ImageDataRotator };
