import { 
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

    this.drivePower = 0.8
    this.decayValue = 0.95
    this.reverseSpeed = 0.1
    this.brakeSpeed = 0.9
    this.turnRate = 0.2

    this.harderToSteerSpeed = 3
    this.minimumSteerSpeed = 0.5

    this.controlKeyGas = undefined
    this.controlKeyRight = undefined
    this.controlKeyReverse = undefined
    this.controlKeyLeft = undefined
    this.controlKeyBrake = undefined
  }

  setUpControls (gas, right, reverse, left, brake) {
    this.controlKeyGas = gas
    this.controlKeyRight = right
    this.controlKeyReverse = reverse
    this.controlKeyLeft = left
    this.controlKeyBrake = brake
  }

  move () {
    this.speed *= this.decayValue
    
    if (this.drive) {
      this.speed += this.drivePower
    }

    if (this.reverse) {
      this.speed -= this.reverseSpeed
    }

    if (this.steerLeft) {
        if (this.speed > this.harderToSteerSpeed) {
          this.angle -= this.turnRate / (this.speed / 4)
          
        } else if (Math.abs(this.speed) > this.minimumSteerSpeed) {
          this.angle -= this.turnRate
        }
    }

    if (this.steerRight) {
      if (this.speed > this.harderToSteerSpeed) {
        this.angle += this.turnRate / (this.speed / 4)
      } else if (Math.abs(this.speed) > this.minimumSteerSpeed) {
        this.angle += this.turnRate
      }
      
    }

    if (this.brake) {
      this.speed *= this.brakeSpeed
    }

    this.x += Math.cos(this.angle) * this.speed;
	  this.y += Math.sin(this.angle) * this.speed;
  }

  addKeyListeners () {
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }

  keySet (e, setTo) {
    if (e.key === this.controlKeyGas) {
      this.drive = setTo
    }
    if (e.key === this.controlKeyRight) {
      this.steerRight = setTo
    }
    if (e.key === this.controlKeyReverse) {
      this.reverse = setTo
    }
    if (e.key === this.controlKeyLeft) {
      this.steerLeft = setTo
    }
    if (e.key === this.controlKeyBrake) {
      this.brake = setTo
    }
  }

  keyDown = (e) => {
    this.keySet(e, true)
  }

  keyUp = (e) => {
    this.keySet(e, false)
  }

  trackHandler () {
  
    var carGridCol = Math.floor(this.x / trackWidth);
    var carGridRow = Math.floor(this.y / trackHeight);
    var gridIndexUnderCar = colRowIndex(carGridCol, carGridRow);

    if(carGridCol >= 0 && carGridCol < trackCols &&
      carGridRow >= 0 && carGridRow < trackRows) {

      if(tracks[gridIndexUnderCar]) { // Hit a wall
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