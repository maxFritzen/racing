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


export class Ball {
  constructor (x, y, w, color = 'white', canvas, sprite) {
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
    this.sprite = sprite

    this.id = 123
  }

  move () {
    // this.x += this.speedX;
    // this.y += this.speedY;
  }

  // trackHandler () {
  //   const ballGridCol = Math.floor(this.x / trackWidth)
  //   const ballGridRow = Math.floor(this.y / trackHeight) - topGap
  //   const gridIndex = colRowIndex(ballGridCol, ballGridRow)
  //   if ( ballGridCol >= 0 && ballGridCol < trackCols
  //     && ballGridRow >= 0 && ballGridRow < trackRows
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
  
    var ballBrickCol = Math.floor(this.x / trackWidth);
    var ballBrickRow = Math.floor(this.y / trackHeight);
    var brickIndexUnderBall = colRowIndex(ballBrickCol, ballBrickRow);

    if(ballBrickCol >= 0 && ballBrickCol < trackCols &&
      ballBrickRow >= 0 && ballBrickRow < trackRows) {

      if(tracks[brickIndexUnderBall]) {
        // trackHit(brickIndexUnderBall)
      

        var prevBallX = this.x - this.speedX;
        var prevBallY = this.y - this.speedY;
        var prevBrickCol = Math.floor(prevBallX / trackWidth);
        var prevBrickRow = Math.floor(prevBallY / trackHeight);

        var bothTestsFailed = true;

        if(prevBrickCol != ballBrickCol) {
          var adjBrickSide = colRowIndex(prevBrickCol, ballBrickRow);

          if(tracks[adjBrickSide] === 0) {
            this.speedX *= -1;
            bothTestsFailed = false;
          }
        }
        if(prevBrickRow !== ballBrickRow) {
          var adjBrickTopBot = colRowIndex(ballBrickCol, prevBrickRow);

          if(tracks[adjBrickTopBot] === 0) {
            this.speedY *= -1;
            bothTestsFailed = false;
          }
        }

        if(bothTestsFailed) { // armpit case, prevents ball from going through
          this.speedX *= -1;
          this.speedY *= -1;
        }

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
    // drawCircle(x, y, w, this.color)


    if (this.sprite) {
      this.canvasContext.drawImage(this.sprite.image, this.sprite.startX, 0, 200, 500, x, y, 20, 40)
    }
  }

}