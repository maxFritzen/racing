import { Car } from './car.js'
import { drawRect, drawText } from './common-graphics.js'

let canvas, canvasContext
export var fps = 30
let objects = [];

let mouseX = 0;
let mouseY = 0;
export const trackWidth = 40;
export const trackHeight = 40;
export let trackCols = 800 / trackWidth;
export const trackRows = 600 / trackHeight;
export const topGap = 3
const trackGap = 4;
const image = document.createElement('img')
let imageLoaded = false
const carSprites = []
const carSpriteWidth = 200
const carSpriteHeight = 500
const levelOne = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,
  1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,2,0,0,2,0,0,0,0,3,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,1,1,1,
  1,1,0,0,2,0,0,2,0,0,0,0,3,0,0,0,0,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];
export let tracks = [];

export const goal = 3
export const playerStart = 2
export const wall = 1
export const road = 0;
// export const tracks = [
//   1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
//   1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,
//   1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
//   1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
//   1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,
//   1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,
//   1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,
//   1,0,2,0,1,1,1,1,1,1,0,1,1,1,0,0,0,0,1,1,
//   1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,
//   1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,
//   1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,
//   1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,1,1,
//   1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
//   1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
//   1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
// ];

(function setUp (document) {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  trackCols = canvas.width / trackWidth;
  // car1 = new Car(0, 0, 10, 'white', canvas)
  drawRect(canvasContext, 0, 0, canvas.width, canvas.height, 'black')
  drawText(canvasContext, 'Loading...', canvas.width / 2 - 60, canvas.height / 2, 'white')
  image.onload = () => {
    console.log('imageloaded')
    imageLoaded = true
    // Images have gap approx one carSpriteWidth
    const numberOfImages = Math.ceil(image.width / (carSpriteWidth * 2))
    for (let i = 0; i < numberOfImages; i++) {
      carSprites.push({ 
        image: image, 
        startX: (carSpriteWidth * 2) * i
      })
    }
    console.log(carSprites)
    reset()
    
    
    setInterval(updateAll, 1000 / fps);
    
  }
  image.src = 'src/cars_racer.svg'

  // Good for debugging position
  // canvas.addEventListener('mousemove', updateMouseMove)
  // window.addEventListener('keydown', keyDownDebug)
})(document)

const setUpCar = (controls, sprite, name) => {
  const {x, y} = getCarStartPos()
  const car = new Car(x, y, 20, 40, 'white', canvas, sprite, name)
  car.addKeyListeners()
  car.setUpControls(...controls)

  return car
}
export const win = (name) => {
  console.log(name + ' wins!')
  reset()
}
const reset = () => {
  tracks = [ ...levelOne ]
  const car1 = setUpCar(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', ' '], carSprites[0], 'p1')
  const car2 = setUpCar(['w', 'd', 's', 'a', 'q'], carSprites[1], 'p2')
  const car3 = setUpCar(['u', 'k', 'j', 'h', 'y'], carSprites[2], 'p3')
  const car4 = setUpCar(['t', 'h', 'g', 'f', 'r'], carSprites[3], 'p4')
  objects = [car1, car2, car3, car4]
}

function keyDownDebug (e) {
  console.log(e)
  if (e.key === 'd') {
    console.log('tracks:', tracks)
    getCarStartPos()
  }
  
}



function updateMouseMove (e) {
  const rect = canvas.getBoundingClientRect()
  const root = document.documentElement
  mouseX = e.clientX - rect.left - root.scrollLeft
  mouseY = e.clientY - rect.top- root.scrollTop
  car1.x = mouseX
  car1.y = mouseY
  // car1.speedX = 3
  // car1.speedY = -4
}

export function colRowIndex (col, row) {
  return col + trackCols * row
}

function getCarStartPos () {
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < trackCols; eachCol++) {
      let index = colRowIndex(eachCol, eachRow)
      if (tracks[index] === playerStart) {
        const x = eachCol * trackWidth
        const y = eachRow * trackHeight
        tracks[index] = 0
        return { x, y }
      }
    }
  }
}

function updateAll () {
  update();
  draw();
}

export function trackHit (index) {
  console.log('trackhit', index)
  tracks[index] = 0
}


export function isCollission (a, b) {
  var bTopEdgeY = b.y;
	var bBottomEdgeY = b.y + b.h;
	var bLeftEdgeX = b.x;
	var bRightEdgeX = b.x + b.w;
return a.y >= bTopEdgeY && // below the top of b
		a.y <= bBottomEdgeY && // above bottom of b
		a.x >= bLeftEdgeX && // right of the left side of b
    a.x <= bRightEdgeX// left of the left side of b
}

function update () {
  objects.forEach((obj) => {
    obj.update()
  })
  // car1.update()
  // car2.update()
}

function draw () {
  drawRect(canvasContext,0, 0, canvas.width, canvas.height, 'black')
  drawTracks()

  objects.forEach((obj) => {
    obj.draw()
  })
  // car1.draw()
  // car2.draw()
  // drawText(`x: ${mouseX}, y: ${mouseY}`, 50, 50, 'green')
}

function drawTracks() {
  let drawTileX = 0
  let drawTileY = 0
  const width = trackWidth - 4
  const height = trackHeight - 4
  for (let eachRow = 0; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < trackCols; eachCol++) {
      const gridUnit = tracks[colRowIndex(eachCol, eachRow)]
      if (gridUnit === wall) {
        drawRect(canvasContext, drawTileX, drawTileY, width, height, 'blue')
      }
      if (gridUnit === goal) {
        drawRect(canvasContext, drawTileX, drawTileY, width, height, 'red')
      }
      drawTileX += trackWidth
    }
    drawTileY += trackHeight
    drawTileX = 0
  }
}
