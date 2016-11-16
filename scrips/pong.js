var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var should_step = false;

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
    this.speed=5;
    
    this.move = function(){  //tried passing in key code
        this.y+= this.speed;
        if(this.speed >=5){
            this.speed =5;
        }
        if(this.speed <= -5){
            this.speed = -5;
        }
        if (this.y<0){
         //   console.log('wezzzzzz in move "if"')
            this.y=0;
        }
        if(this.y >= (canvas.height-100)){
            this.y=(canvas.height-100);
        }
    }
    
    
//    
//    this.aI = function(){
//        this.y = this.speed;
//        
//
//
//    }
    
    
    
    
    this.render = function() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'yellow';
        context.fill();
        context.stroke();
    }
    
    
    
    
}

function Player(x, y){
    this.paddle = new Paddle(x, y, 100, 5)
        
    this.render = function() {
        this.paddle.render();
    }
}

function Computer(x, y){
    this.paddle = new Paddle(x, y, 100, 5)  
        
    this.render = function() {
        this.paddle.render();
    }
}

function Ball(x,y){
    this.x = x;
    this.y = y;
    this.radius = 25;
    this.goingUp = false;
    this.goingLeft = false;
    
    this.speedX = 1;
    this.speedY = 1;

    var velocityBall = function(){
        if(goingUp){
           this.y+=1
           console.log("What up from velocityBall")
        }
    }
    
    
    
    this.move = function(){
        // collision detection
        // borders
        if(this.y>=canvas.height - this.radius){//deals with the bottom border for some fucking reason
           console.log("in first if statement")
            this.goingUp = true;
           // velocityBall();
            //return
        }
        if(this.y<= this.radius){//deals with the top border for some fucking reason
            console.log("in 2nd if statement")
            this.goingUp = false;
            //velocityBall();
            //return
        }
        
        // player paddle
        if(
            (this.y >= player.paddle.y) && 
            (this.y <= (player.paddle.y + player.paddle.height)) &&
            (this.x + this.radius >= player.paddle.x)) { //changing ball direction
            this.goingLeft=true;
        }
        
        // move ball
        if (this.goingUp){
            this.y += -this.speedY;
        }else{
            this.y += this.speedY;
        }
        
        if (this.goingLeft){
            this.x += -this.speedX;
        }else{
            this.x += this.speedX;
        }


    }
    
    this.render = function() {
        context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2* Math.PI);
            context.strokeStyle = 'red';
            context.fillStyle = 'red';
            context.fill();
            context.closePath();
    }
    
}

var inIt = function(){
    ball = new Ball(canvas.width-70, canvas.height-120);
    computer = new Computer(10,100);
    player = new Player((canvas.width-20),canvas.height-50);
}

var midline = function(){
    context.beginPath(); //midline
    context.moveTo(300, 600);
    context.lineTo(300, 0);
    context.lineWidth = 1;
    context.strokeStyle = '#ff0000';
    context.stroke();


}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!should_step) {
        player.paddle.move();
        ball.move();
    }
    
    ball.render();
    computer.render();
    player.render();
    
    midline();

}

var step = function(timestamp){
    render();
    animate(step);
}

var onKeyPress = function(event){
    var keycode = event.keyCode;
    if(keycode==38){         //38= uparrow
        player.paddle.speed = -5;
    }
    if(keycode==40){         //40= down arrow
        player.paddle.speed = 5;
    }
    if(keycode==32){ //32==space
        // step move
        if (should_step) {
            player.paddle.move();    
            ball.move();
        }
    } 
        
}

window.onload = function(){
    inIt();
    animate(step);
    document.onkeydown = onKeyPress;
    //window.addEventListener("keypress", onKeyPress);//keypress=event onKeyPress=function
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




