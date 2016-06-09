// canvas vars
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");	
var x = canvas.width/2;
var y = canvas.height-30;
//ball vars
var speed = 1;
var dx = speed;
var dy = -speed;
var ballRadius = 10;
//paddle vars
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

//brick vars
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
    }
}


//random color generator
function rCol()
{
col = Math.round(255.0*Math.random());
r = col.toString(16);
col = Math.round(255.0*Math.random());
g=col.toString(16);
col = Math.round(255.0*Math.random());
b=col.toString(16);
col="#"+r+g+b;
return col;
}

//default ball color
ctx.fillStyle = "#0095DD"

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    
    ctx.fill();
    ctx.closePath();
	
	var rancol = rCol();
	
	if(y  > canvas.height -ballRadius|| y  == ballRadius || x  > canvas.width -ballRadius|| x == ballRadius ) {
    ctx.fillStyle = rancol;} 	
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
	if(x  > canvas.width -ballRadius|| x + dx < ballRadius) {
    dx = -dx;	
}

    if(y + dy < ballRadius) {
    dy = -dy;
} else if(x > paddleX && x < paddleX + paddleWidth && y> canvas.height-ballRadius-paddleHeight){
    
        dy = -dy;
		dx+=0.2;
		dy-=0.2;
		
    }
	if (y>canvas.height){
        alert("GAME OVER");
        document.location.reload();
    }

	

drawPaddle();
drawBricks();

if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


setInterval(draw, 10);
