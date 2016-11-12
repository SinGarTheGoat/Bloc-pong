var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');



var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };

var ball;
var computer;
var player;

function Paddle(x, y, height, width){
    this.x = x;
    this.y = y;
    this.height= height;
    this.width = width;
    this.speed=10;
    
    this.move = function(){  //tried passing in key code
        this.y+= this.speed;
       //console.log("y is " +this.y+ "this is speed"+ this.speed);
        if (this.y<0){
         //   console.log('wezzzzzz in move "if"')
            this.y=0;
        }
        if(this.y>=canvas.height){
            this.y=canvas.height;
        }
    }
    
    this.render = function() {
        console.log("y is " +this.y+ "this is speed"+ this.speed+ "this is x"+this.x);
       context.beginPath();
        context.rect(this.x, this.y, 10, 100);
        context.fillStyle = 'yellow';
        context.fill();
        context.stroke();
    }
}

function Player(x, y){
    this.paddle = new Paddle(x, y, 20, 5)
        
    this.render = function() {
        this.paddle.render();
    }
}

function Computer(x, y){
    this.paddle = new Paddle(x, y, 20, 5)  
        
    this.render = function() {
        this.paddle.render();
    }
}

function Ball(x,y){
    this.x = x;
    this.y = y;
        
    this.render = function() {
    
        context.beginPath();
            context.arc(x, y, 50, 0, 2* Math.PI);
            context.strokeStyle = 'red';
            context.fillStyle = 'red';
            context.fill();
            context.closePath();
    }
}

var inIt = function(){
    ball = new Ball(350, 99);
    computer = new Computer(10,100);
    player = new Player(500,100);
}

function render() {
    //console.log("in render to start");
    player.paddle.move();
     //console.log("player.paddle.move();");
    ball.render();
     //console.log("ball.render();");
    computer.render();
     //console.log("computer.render();");
    player.render();
    
}

var step = function(timestamp){
    render();
    animate(step);
}

var onKeyPress = function(event){
    console.log("onKeyPress");
    var keycode = event.keyCode;
    if(keycode==38){         //38= uparrow
        player.paddle.speed = -10;
    }
    if(keycode==40){         //40= down arrow
        player.paddle.speed = 10;
    }
}

window.onload = function(){
    inIt();
    animate(step);
    window.addEventListener("keypress", onKeyPress);//keypress=event onKeyPress=function
};

//first we initilize values of paddels and balls with inIt 
//then we call the animate function and pass in the step function as an argument
// the animate function calls the step function 
//the step function first calls the render function, 
// the render function calls  player.paddle.move, ball.render, computer.render, player.render
       //the  player.paddle.move looks at the y value and adds the value passed in by the speed varible, the speed varible is set by the onKeyPress function (wich we are not getting into)
        //

//
//context.beginPath();
//    var paddelLeft = context.rect(10, 10, 10, 100);
//    var paddelRight = context.rect(580, 10, 10, 100);
//    //context.rect(188, 50, 200, 100);
//    context.fillStyle = 'yellow';
//    context.fill();
//    context.stroke();
//
//context.beginPath(); //midline
//    context.moveTo(300, 600);
//    context.lineTo(300, 0);
//    context.lineWidth = 1;
//    context.strokeStyle = '#ff0000';
//    context.stroke();
//
//context.beginPath();
//    context.arc(350, 150, 50, 0, 2* Math.PI);
//    context.strokeStyle = 'red';
//    context.fillStyle = 'red';
//    context.fill();
//    context.closePath();




