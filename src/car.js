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

  // trackHandler () {
  //   const carGridCol = Math.floor(this.x / trackWidth)
  //   const carGridRow = Math.floor(this.y / trackHeight) - topGap
  //   const gridIndex = colRowIndex(carGridCol, carGridRow)
  //   if ( carGridCol >= 0 && carGridCol < trackCols
  //     && carGridRow >= 0 && carGridRow < trackRows
  //     && tracks[gridIndex]
  //     ) {
  //       const { x: trackX, y: trackY, w: trackW, h: trackH, id } = tracks[gridIndex]
  //       this.color = 'green'
        
  //       const hitBotttom = this.y - this.speedY >= trackY + trackH
  //       const hitTop = this.y - this.speedY <= trackY && !hitBotttom
  //       const hitRight = this.x - this.speedX >= trackX + trackW
  //       const hitLeft = this.x - this.speedX <= trackX
  //       if (hitRight || hitLeft) {
  //         this.speedX *= -1
  //       }
  //       if (hitTop || hitBotttom) {
  //         this.speedY *= -1
  //       }

  //     }
  // }

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
    // drawCircle(x, y, w, this.color)
    const centerX = x - w / 2
    const centerY = y - h / 2

    var carX = Math.cos(this.angle) * 2;
	  var carY = Math.sin(this.angle) * 2;
    if (this.sprite) {
      console.log(x, y, w, h, this.sprite.startX, centerX, centerY,this.angle, 200/ Math.PI / 10)
      this.canvasContext.save()
      this.canvasContext.translate(x, y)
      this.canvasContext.rotate(this.angle + (90 * Math.PI / 180))
      this.canvasContext.drawImage(
        this.sprite.image, 
        this.sprite.startX, 
        0, 
        200, 
        500,  
        -w / 2, // dx
        -h / 2, // dy
        w, 
        h)
      // this.canvasContext.drawImage(
      //   this.sprite.image, 
      //   this.sprite.startX, 
      //   0, 
      //   200, 
      //   500, 
      //   centerX, 
      //   centerY, 
      //   w, 
      //   h)
        this.canvasContext.restore()
    }
  }

}