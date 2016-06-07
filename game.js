var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
	
var x = canvas.width/2;
var y = canvas.height-30;
var speed = 0.5;
var dx = speed;
var dy = -speed;
var ballRadius = 10;

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
	if(x  > canvas.width -ballRadius|| x + dx < ballRadius) {
    dx = -dx;
	
	
	
}

    if(y  > canvas.height -ballRadius|| y + dy < ballRadius) {
    dy = -dy;
	
	
}
}

setInterval(draw, 10);
