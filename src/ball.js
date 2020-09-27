import { 
  drawCircle, 
  tracks, 
  trackCols, 
  trackRows, 
  rowColIndex, 
  trackHeight, 
  trackWidth, 
  topGap,
 } from './index.js';


export class Ball {
  constructor (x, y, w, color = 'white', canvas) {
    this.startX = x
    this.startY = y
    this.x = x
    this.y = y
    this.w = w
    this.canvas = canvas
    this.canvasContext = canvas.getContext('2d')
    this.color = color
    this.canvasContext.fillStyle = color;
    this.speedX = 5
    this.speedY = 5
    this.type = 'ball'

    this.id = 123
  }

  move () {
    // this.x += this.speedX;
    // this.y += this.speedY;
  }

  trackHandler () {
    const ballGridCol = Math.floor(this.x / trackWidth)
    const ballGridRow = Math.floor(this.y / trackHeight) - topGap
    const gridIndex = rowColIndex(ballGridCol, ballGridRow)
    if ( ballGridCol >= 0 && ballGridCol < trackCols
      && ballGridRow >= 0 && ballGridRow < trackRows
      && tracks[gridIndex]
      ) {
        const { x: trackX, y: trackY, w: trackW, h: trackH, id } = tracks[gridIndex]
        this.color = 'green'
        
        const hitBotttom = this.y - this.speedY >= trackY + trackH
        const hitTop = this.y - this.speedY <= trackY && !hitBotttom
        const hitRight = this.x - this.speedX >= trackX + trackW
        const hitLeft = this.x - this.speedX <= trackX
        if (hitRight || hitLeft) {
          this.speedX *= -1
        }
        if (hitTop || hitBotttom) {
          this.speedY *= -1
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
    const { x, y , w } = this
    drawCircle(x, y, w, this.color)
  }

}