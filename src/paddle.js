import { drawRect } from './index.js';

export class Paddle {
  constructor (x, y, w, h, color = 'white', canvas) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.canvas = canvas
    this.canvasContext = canvas.getContext('2d')
    this.color = color
    this.speedX = 15
    this.moveLeft = false
    this.moveRight = false
    document.addEventListener('keydown', (e) => this.handleKeyDown(e.code))
    document.addEventListener('keyup', (e) => this.handleKeyUp(e.code))
  }

  handleKeyUp (key) {
    if (key === 'ArrowLeft') {
      this.moveLeft = false
    } else if (key === 'ArrowRight') {
      this.moveRight = false;
    }
  }

  handleKeyDown (key) {
    if (key === 'ArrowLeft') {
      this.moveLeft = true
    } else if (key === 'ArrowRight') {
      this.moveRight = true;
    }
  }


  move () { 
    if (this.moveLeft) {
      this.x -= this.speedX;
      if (this.x < 0) {
        this.x = 0
      }
    } else if (this.moveRight) {
      this.x += this.speedX;
      if (this.x + this.w > this.canvas.width) {
        this.x = this.canvas.width - this.w;
      }
    }

  }

  update () {
    this.move()

  }

  draw () {
    const { x, y , w, h} = this
    drawRect(x, y, w, h, this.color)
  }

}