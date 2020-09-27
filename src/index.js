import { Ball } from './ball.js'
import { Paddle } from './paddle.js'

let canvas, canvasContext
export var fps = 30
let ball1
let objects = [];

let mouseX = 0;
let mouseY = 0;
export let tracks = [];
export const trackWidth = 80;
export const trackHeight = 20;
export let trackCols = 10;
export const trackRows = 8;
export const topGap = 3
const trackGap = 4;

(function setUp (document) {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  trackCols = canvas.width / trackWidth;
  setTracksGrid()
  setInterval(updateAll, 1000 / fps);
  ball1 = new Ball(canvas.width / 2, canvas.height / 2, 10, undefined, canvas)
  objects = [ ball1 ]
  objects.forEach((x, index) => x.id = index)
  // Good for debugging position
  canvas.addEventListener('mousemove', updateMouseMove)
  window.addEventListener('keydown', keyDownDebug)
})(document)

function keyDownDebug (e) {
  console.log(e.key)
  if (e.key === 'd') {
    console.log('tracks:', tracks)
  }
  
}

function updateMouseMove (e) {
  const rect = canvas.getBoundingClientRect()
  const root = document.documentElement
  mouseX = e.clientX - rect.left - root.scrollLeft
  mouseY = e.clientY - rect.top- root.scrollTop
  ball1.x = mouseX
  ball1.y = mouseY
  // ball1.speedX = 3
  // ball1.speedY = -4
}

export function rowColIndex (col, row) {
  return col + trackCols * row
}


export function setTracksGrid () {
  tracks = []
  for (let eachRow = topGap; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < trackCols; eachCol++) {
      tracks.push(1)
    }
  }
}

function updateAll () {
  update();
  draw();
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
  ball1.update()
}

function draw () {
  drawRect(0, 0, canvas.width, canvas.height, 'black')
  drawTracks()
  objects.forEach((x) => x.draw())
  // drawText(`x: ${mouseX}, y: ${mouseY}`, 50, 50, 'green')
}

export function drawRect (x, y, w, h, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y, w, h);
}

export function drawCircle (x, y, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(x, y, radius, 0, Math.PI * 2);
  canvasContext.fill()
}

function drawTracks() {
  // for (let i = 0; i < tracks.length; i++) {
  //   drawRect(i * trackWidth, i * trackHeight, trackWidth, trackHeight, 'blue')
  // }

  for (let eachRow = topGap; eachRow < trackRows; eachRow++) {
    for (let eachCol = 0; eachCol < trackCols; eachCol++) {
      drawRect(eachCol * trackWidth, eachRow * trackHeight, trackWidth - 4, trackHeight - 4, 'blue')
    }
  }
}

function drawText (text, x, y, color) {
  canvasContext.fillStyle = color
  canvasContext.font = '20px helvetica'
  canvasContext.fillText(text, x, y)
}