import { 
  drawCircle, 
  tracks, 
  trackCols, 
  trackRows, 
  colRowIndex, 
  trackHeight, 
  trackWidth, 
  topGap,
  trackHit
 } from './index.js';


export class Car {
  constructor (x, y, w, h, color = 'white', canvas, sprite) {
    this.startX = x
    this.startY = y
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.canvas = canvas
    this.canvasContext = canvas.getContext('2d')
    this.color = color
    this.canvasContext.fillStyle = color;
    this.speedX = 5
    this.speedY = 5
    this.sprite = sprite
    this.angle = 0
    this.id = 123
    this.speed = 2
  }

  move () {
    this.x += Math.cos(this.angle) * this.speed;
	  this.y += Math.sin(this.angle) * this.speed;

    this.angle += 0.02
  }

  trackHandler () {
  
    var carBrickCol = Math.floor(this.x / trackWidth);
    var carBrickRow = Math.floor(this.y / trackHeight);
    var brickIndexUnderCar = colRowIndex(carBrickCol, carBrickRow);

    if(carBrickCol >= 0 && carBrickCol < trackCols &&
      carBrickRow >= 0 && carBrickRow < trackRows) {

      if(tracks[brickIndexUnderCar]) {
        this.speed *=-1
        // trackHit(brickIndexUnderCar)
      } 
    } 
  }

  update () {
    this.move()

    this.trackHandler()
  }

  collision () {
    this.speedY *= -1
  }

  draw () {
    const { x, y, w, h} = this

    if (this.sprite) {
      this.canvasContext.save()
      this.canvasContext.translate(x, y)
      this.canvasContext.rotate(this.angle + (90 * Math.PI / 180))
      this.canvasContext.drawImage(
        this.sprite.image, 
        this.sprite.startX, 
        0, // start Y
        200, // width of original image
        500,  // height of original image
        -w / 2, // dx
        -h / 2, // dy
        w, 
        h)

        this.canvasContext.restore()
    }
  }

}