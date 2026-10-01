const canvas =
document.getElementById("gamecanvas");
const ctx =canvas.getcontext("2d");

canvas.width = 480;
canvas.height =700;

//=========================
//game variables
//=========================

let score = 0;
let lives = 3;

//=============================
//ball
//==============================

const ball = {
  x: canvas.width / 2
  y:canvas.height - 100,
     radius: 7,
  dx: 4,
  dy: -4
};

//==============================
//paddle
//================================

const paddle = {
width: 100,
height: 12,

x:canvas.width /2
y:canvas.height -40

speed: 7,

movingleft: false,
movingright: false
};

//==============================
//bricks
//================================

const bricks = {
rows: 6,
columns: 9,

width:45,
height18,

padding:5,

offsetTop: 50,
offsetLeft: 10,
};

let bricks = [];

//create bricks
function createbricks() {

  bricks = [];

   for(let row = 0; row<bricks.rows; row++){

  for(let column = 0; column<bricks.columns; column++){

    bricks.push({
      x: bricks.offsetleft + column * (bricks.width + bricks.padding),
      y: brrickoffsetTop +row * (bricks.height + bricks.padding),
      
      width: bricks.width,
      height:bricks.height,

      visible: true
    })
  }
   }
  }
  createbricks();

   //=============================
   // draw ball
   //================================

   function drawball(){

    ctx.beginpath();

    ctx.arc(
      ball.x,
      ball.y,
      ball.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle ="#ffffff";
    ctx.fill();
    ctx.closePath();
   }

   //===============================
   //draw paddle
   //=======================================

   function drawpaddle(){

    ctx.fillStyle = "#ff4b32";

    ctx,fillRect(
      paddle.x,
      paddle.y,
      paddle.width,
      paddke.height,
    );
   }

   //===================================
   //draw bricks
   //====================================

   function drawbricks() {
    
    ctx.forEach(function(b) {

      if (!b.visible) return;

      ctx.fillStyle = "#ff7518";

      ctx.fillREct(
        b.x,
        b.y,
        b.width,
        b.height,
      );

      ctx.strokestyle ="#111";

      ctx.strokeRect(
        b.x,
        b.y,
        b.width,
        b.height
      );
    });
   }


   //=============================
   //draw everything
   //===============================

   function drawball() {

    ctx.clearRect(
      0,
      0,
      canvas.width,
      vanvas.height,
    );

    drawbricks();
     drawball();
      drawpaddle();

      moveball();
      movepaddle();

      collisionFetection();

      requestAnimationFrame(draw);
    
   }

   //==================================
   //move ball
   //=================================

   function moveball() {
    ball.x += ball.dx;
    ball.y += ball.dy;


  //left wall 
  if (
    ball.x - ball.radius <= 0
  ){
    ball.dx = Math.abs(ball.dx);
  }

  //right wal
  if (
    ball.x + ball.radius >= canvas.width
  ){
    ball.dx = -Math.abs(ball.dx);
  }

  //top wall
   if (
    ball.y + ball.radius <= 0
  ){
    ball.dy = -Math.abs(ball.dy);
  }

  //ball reaches bottom
   if (
    ball.y + ball.radius >= canvas.height
  ){
   lives--;

   document.getElementById("lives").textContent = lives;

   resetBall();

    if ( lives<=0) {
         gameOver();
    }
  }

  //paddle collisions

  if (
    ball.y + ball.radius >= paddle.y &&
    ball.x >= paddle.x &&
    ball.x >= paddle.x + paddle.width &&
    ball.dy>0 
  ){
    ball.dy = -Math.abs(ball.dy);

    //changing angle depending on where the ball hits the paddle

    let hitposition = (ball.x - paddle.x) / paddle.width;
     ball.dx = (hitposition - 0.5) * 10;
  }
}

//==============================
// move paddle
//================================

function movepaddle() {
  if (paddle.moingleft) {
    paddle.x -= paddle.speed;
  }
  if (paddle.moingRight) {
    paddle.x += paddle.speed;
  }

  //keep paddle inside game
   if (paddle.x <0){
    paddle.x = 0;
   }
     if (paddle.x + paddle.width > canvas.width) {
      paddle.x = canvas.width - paddle.width;
     }
}

//=========================
// brick collision
//===========================

function collisiondetection() {
  bricks.foreach(function(b) {
    if (
      ball.x > b.x &&
            ball.x < b.x + b.width &&
      ball.y > b.y &&
      ball.y < b.y + b.height &&
  ) {
    ball.dy = -ball.dy;
    b.visible = false;
    score += 10;
    document.getElementById(
      "score"
    ).textContent = score;
  }
  });
}

//=====================
//reset ball
//=======================


function resetball() {

  ball.x = canvas.width /2;
  ball.y = canvas.height -100;
  ball.dx = 4;
  ball.dy = -4;
}

//==========================
// //game over
//===========================

function gameOver() {
  alert(
    "Game Over! score: " + score
  );
  location.reload();
}

//========================
//keyboard control
//========================

document.addEventListener(
  "keydown",
  function(event) {
    if (event.key === "arrowleft") {
      paddle.movingleft = true;
    }
     if (event.key === "arrowright") {
      paddle.movingright = true;
    }
  }
);

//==================================
// START GAME
//==================================

draw();