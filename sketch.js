let xDirectionArray = [1, 0, -1, 0];
let yDirectionArray = [0, 1, 0, -1];
let directionIndex = 0;

let cX = [];
let cY = [];
let len = 3;
let diameter = 10;

let foodX, foodY;



function strt() {
  loop();
 // song.loop();
}

function crossOver() {
  // Check if head collides with any body segment (ignoring edges)
  if (cX[0] > 5 && cX[0] < 395 && cY[0] > 5 && cY[0] < 395 && len > 1) {
    for (let i = 1; i < len; i++) {
      if (cX[0] === cX[i] && cY[0] === cY[i]) {
       
        console.log("Game Over: Snake hit itself");
        noLoop();
      }
    }
  }
}

function caterpillar() {

  if (cX[0] === foodX && cY[0] === foodY) {
   
    plotFood();
    len += 1;
  //  bell.play();
  }


  for (let i = len - 1; i > 0; i--) {
    cX[i] = cX[i - 1];
    cY[i] = cY[i - 1];
  }


  cX[0] += xDirectionArray[directionIndex] * 10;
  cY[0] += yDirectionArray[directionIndex] * 10;


  crossOver();


  for (let i = 0; i < len; i++) {
    fill("green");
    cX[i] = constrain(cX[i], 5, 400 - 5);
    cY[i] = constrain(cY[i], 5, 400 - 5);
    circle(cX[i], cY[i], diameter);
  }
}

function plotFood() {
  let success = false;
  while (!success) {
    foodX = round(random(5, 395));
    foodX -= foodX % 10;
    foodX += 5;

    foodY = round(random(5, 395));
    foodY -= foodY % 10;
    foodY += 5;

    success = true;
    for (let i = 0; i < len; i++) {
      if (cX[i] === foodX && cY[i] === foodY) {
        success = false;
        break;
      }
    }
  }
}

// On-screen direction button functions
function rightButton() {
  if (directionIndex !== 2) directionIndex = 0;
}

function leftButton() {
  if (directionIndex !== 0) directionIndex = 2;
}

function upButton() {
  if (directionIndex !== 1) directionIndex = 3;
}

function downButton() {
  if (directionIndex !== 3) directionIndex = 1;
}

function setup() {
  noLoop();
  frameRate(8);

  cX[0] = 35;
  cY[0] = 15;

  createCanvas(400, 500);
  plotFood();

  // Start button
  let btnStart = createButton("start!");
  btnStart.mouseClicked(strt);
  btnStart.size(120, 50);
  btnStart.position(15, 735);
  btnStart.style("font-family", "Comic Sans MS");
  btnStart.style("font-size", "28px");

  // Up button
  let btnUp = createButton("U");
  btnUp.mouseClicked(upButton);
  btnUp.size(60, 30);
  btnUp.position(230, 740);
  btnUp.style("font-family", "Comic Sans MS");
  btnUp.style("font-size", "18px");

  // Down button
  let btnDown = createButton("D");
  btnDown.mouseClicked(downButton);
  btnDown.size(60, 30);
  btnDown.position(230, 790);
  btnDown.style("font-family", "Comic Sans MS");
  btnDown.style("font-size", "18px");

  // Left button
  let btnLeft = createButton("L");
  btnLeft.mouseClicked(leftButton);
  btnLeft.size(60, 30);
  btnLeft.position(150, 765);
  btnLeft.style("font-family", "Comic Sans MS");
  btnLeft.style("font-size", "18px");

  // Right button
  let btnRight = createButton("R");
  btnRight.mouseClicked(rightButton);
  btnRight.size(60, 30);
  btnRight.position(310, 765);
  btnRight.style("font-family", "Comic Sans MS");
  btnRight.style("font-size", "18px");
}

function draw() {
  background("black");
  caterpillar();

  // Draw food
  fill("red");
  circle(foodX, foodY, 10);

  // Lower UI control panel background
  fill("beige");
  rect(0, 400, 400, 100);

  // Score display
  textSize(22);
  stroke("black");
  fill("black");
  text("score = " + len, 15, 490);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW && directionIndex !== 2) {
    directionIndex = 0;
  } else if (keyCode === LEFT_ARROW && directionIndex !== 0) {
    directionIndex = 2;
  } else if (keyCode === UP_ARROW && directionIndex !== 1) {
    directionIndex = 3;
  } else if (keyCode === DOWN_ARROW && directionIndex !== 3) {
    directionIndex = 1;
  }

  return false; // Prevent arrow keys from scrolling the page
}