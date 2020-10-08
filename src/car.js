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
    this.id = 123
    
    this.angle = 0
    this.speed = 0
    this.drive = false
    this.reverse = false
    this.steerLeft = false
    this.steerRight = false
    this.brake = false
  }

  move () {
    this.speed *= 0.95
    
    if (this.drive) {
      this.speed += 0.8
    }

    if (this.reverse) {
      this.speed -= 0.1
    }

    if (this.steerLeft) {
      
      if (this.speed > 3) {
        this.angle = this.angle - 0.2 / (this.speed / 4)
        
      } else if (this.speed !== 0) {
        this.angle = this.angle - 0.2
      }
    
    }

    if (this.steerRight) {
      if (this.speed > 3) {
        this.angle = this.angle + 0.2 / (this.speed / 4)
      } else if (this.speed !== 0) {
        this.angle = this.angle + 0.2
      }
      
    }

    if (this.brake) {
      this.speed *= 0.9
    }

    this.x += Math.cos(this.angle) * this.speed;
	  this.y += Math.sin(this.angle) * this.speed;
  }

  addKeyListeners () {
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }

  keyDown = (e) => {
    if (e.key === 'ArrowUp') {
      this.drive = true
    }
    if (e.key === 'ArrowDown') {
      this.reverse = true
    }
    if (e.key === 'ArrowLeft') {
      this.steerLeft = true
    }
    if (e.key === 'ArrowRight') {
      this.steerRight = true
    }

    if (e.code === 'Space') {
      this.brake = true
    }
  }

  keyUp = (e) => {
    if (e.key === 'ArrowUp') {
      this.drive = false
    }
    if (e.key === 'ArrowDown') {
      this.reverse = false
    }
    if (e.key === 'ArrowLeft') {
      this.steerLeft = false
    }
    if (e.key === 'ArrowRight') {
      this.steerRight = false
    } 
    if (e.code === 'Space') {
      this.brake = false
    }
  }

  trackHandler () {
  
    var carBrickCol = Math.floor(this.x / trackWidth);
    var carBrickRow = Math.floor(this.y / trackHeight);
    var brickIndexUnderCar = colRowIndex(carBrickCol, carBrickRow);

    if(carBrickCol >= 0 && carBrickCol < trackCols &&
      carBrickRow >= 0 && carBrickRow < trackRows) {

      if(tracks[brickIndexUnderCar]) {
        this.x -= Math.cos(this.angle) * this.speed;

        this.y -= Math.sin(this.angle) * this.speed;
        this.speed *=-1
        // trackHit(brickIndexUnderCar)
      } 
    } 
  }

  update () {
    this.move()

    this.trackHandler()
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