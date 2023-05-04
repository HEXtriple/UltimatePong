//Pong Game
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = "100%";
canvas.style.height = "100%";
let c = canvas.getContext("2d");
let timer = document.getElementById("timer");

let xPosDot = Math.floor(Math.random() * (0.8 * canvas.width - 200) + 200);
let yPosDot = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

let yPosPaddel = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);
let yPosPaddel2 = Math.floor(Math.random() * (0.8 * canvas.height - 200) + 200);

const xPosPaddel = canvas.width/6;
const xPosPaddel2 = canvas.width - canvas.width/6;

// Hastighet för respektive kvadrat, i x- och y-led
// kan slumpas fram inom lämpligt intervall enl. samma metod som startläget.
let dxDot = 3;
let dyDot = 2;

let paddelspeed = 10;

const sizeDot = 30;

const heightSizePaddel = 200;
const widthSizePaddel = 10;

// Variabler som håller reda på respektive kvadrats mittkoordinat
let xCenterDot = (xPosDot + xPosDot + sizeDot) / 2;
let yCenterDot = (yPosDot + yPosDot + sizeDot) / 2;


// Variabler för tidsmätning
let ticks = 0;
let runtime = 0;
const updateFrequency = 10; // millisekunder per steg

document.onkeydown = function (e) {
  const key = e.key;
  switch (key) {
    case "ArrowUp":
      yPosPaddel = yPosPaddel - paddelspeed;
      break;
    case "ArrowDown":
      yPosPaddel = yPosPaddel + paddelspeed;
      break;
  }
};

let myTimer = setInterval(update, updateFrequency);
let myTimer2 = setInterval(PaddelAI, updateFrequency);

// Ritar upp kvadraterna
function update() {
  // Håller koll på tiden som programmet varit igång
  ticks += 1;
  runtime = (ticks / 1000) * updateFrequency; // i sekunder
  timer.innerHTML = "Tid: " + runtime.toFixed(1) + " sekunder";
  
  //GameSpeed
  if (runtime % 10 == 0) {
    dxDot += 1;
    dyDot += 1;
  }

  clearCanvas()
  checkBounce();
  paddelCanvasCollide();
  paddelCollisionDetectionTM();

  // Beräkna nytt läge
  xPosDot += dxDot;
  yPosDot += dyDot;

  xCenterDot = (xPosDot + xPosDot + sizeDot) / 2;
  yCenterDot = (yPosDot + yPosDot + sizeDot) / 2;


  drawRects();
  
}

function paddelCollisionDetectionTM(){
  //Paddel 1
  if (xPosDot + sizeDot > xPosPaddel && xPosDot < xPosPaddel + widthSizePaddel && yPosDot + sizeDot > yPosPaddel && yPosDot < yPosPaddel + heightSizePaddel) {
    dxDot = -dxDot;
  }

  //Paddel 2
  if (xPosDot + sizeDot > xPosPaddel2 && xPosDot < xPosPaddel2 + widthSizePaddel && yPosDot + sizeDot > yPosPaddel2 && yPosDot < yPosPaddel2 + heightSizePaddel) {
    dxDot = -dxDot;
  }
}

function paddelCanvasCollide(){
  //Stop the paddle1 from going out of the canvas
  if (yPosPaddel < 0 ) {
    yPosPaddel = 0;
  }

  if (yPosPaddel > canvas.height - heightSizePaddel ) {
    yPosPaddel = canvas.height - heightSizePaddel;
  }

  //Stop the paddle2 from going out of the canvas
  if (yPosPaddel2 < 0 ) {
    yPosPaddel2 = 0;
  }

  if (yPosPaddel2 > canvas.height - heightSizePaddel ) {
    yPosPaddel2 = canvas.height - heightSizePaddel;
  }
}

// Då respektive kvadrat kommer till en ytterkant ska de studsa
function checkBounce() {
  if (xPosDot < 0 || xPosDot > canvas.width - sizeDot) {
    dxDot = -dxDot;
  }

  if (yPosDot < 0 || yPosDot > canvas.height - sizeDot) {
    dyDot = -dyDot;
  }

  if (xPosDot < 0) {
    alert("AI wins!");
    document.location.reload();
  }
  
  if (xPosDot > canvas.width - sizeDot) {
    alert("Player wins!");
    document.location.reload();
  }
}

function clearCanvas() {
  c.fillStyle = "rgba(0, 0, 0, 0.2)"
  c.fillRect(0, 0, canvas.width, canvas.height)
}

function drawRects(){
  // Den röda kvadraten ritas i sitt nya läge
  c.fillStyle = "red";
  c.fillRect(xPosDot, yPosDot, sizeDot, sizeDot);

  // Den vita paddeln (rektangel) ritas i sitt nya läge
  c.fillStyle = "white";
  c.fillRect(xPosPaddel, yPosPaddel, widthSizePaddel, heightSizePaddel);

  // Den vita paddeln (rektangel) ritas i sitt nya läge
  c.fillStyle = "white";
  c.fillRect(xPosPaddel2, yPosPaddel2, widthSizePaddel, heightSizePaddel);
}

function PaddelAI(){
  if (yPosPaddel2 < yCenterDot) {
    yPosPaddel2 = yPosPaddel2 + paddelspeed;
  }

  if (yPosPaddel2 > yCenterDot) {
    yPosPaddel2 = yPosPaddel2 - paddelspeed;
  }
}
