const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
 {x:300,y:300},
 {x:280,y:300},
 {x:260,y:300}
];

let direction = "RIGHT";

let food = {
x: Math.floor(Math.random()*30)*20,
y: Math.floor(Math.random()*30)*20
};

let score = 0;

document.addEventListener("keydown", function(event){

if(event.key=="w") setDirection("UP");
if(event.key=="s") setDirection("DOWN");
if(event.key=="a") setDirection("LEFT");
if(event.key=="d") setDirection("RIGHT");

});

function setDirection(dir){

if(dir=="UP" && direction!="DOWN") direction="UP";
if(dir=="DOWN" && direction!="UP") direction="DOWN";
if(dir=="LEFT" && direction!="RIGHT") direction="LEFT";
if(dir=="RIGHT" && direction!="LEFT") direction="RIGHT";

}

function draw(){

ctx.fillStyle="black";
ctx.fillRect(0,0,600,600);

for(let i=0;i<snake.length;i++){

ctx.fillStyle = i==0 ? "lime" : "white";
ctx.fillRect(snake[i].x,snake[i].y,box,box);

}

ctx.fillStyle="blue";
ctx.fillRect(food.x,food.y,box,box);

let headX = snake[0].x;
let headY = snake[0].y;

if(direction=="LEFT") headX -= box;
if(direction=="RIGHT") headX += box;
if(direction=="UP") headY -= box;
if(direction=="DOWN") headY += box;

if(headX==food.x && headY==food.y){

score++;
document.getElementById("score").innerText="Score: "+score;

food = {
x: Math.floor(Math.random()*30)*20,
y: Math.floor(Math.random()*30)*20
};

}else{

snake.pop();

}

let newHead = {x:headX,y:headY};

if(
headX<0 || headX>=600 ||
headY<0 || headY>=600 ||
collision(newHead,snake)
){

clearInterval(game);
alert("GAME OVER");

}

snake.unshift(newHead);

}

function collision(head,array){

for(let i=0;i<array.length;i++){

if(head.x==array[i].x && head.y==array[i].y){
return true;
}

}

return false;

}

let game = setInterval(draw,100);