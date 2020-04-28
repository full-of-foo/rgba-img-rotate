export default class Rotator implements Object {
  static rotate(image: ImageData, angle: number): ImageData {
    console.log('called with angle: ', angle);
    return image;
  }
}
