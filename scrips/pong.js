var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var should_step = false;

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 10000 / 60)
    };

var ball;
var computer;
var player;
var bal;
var hits;
var humanScore = 0;
var compScore = 0;

function Paddle(x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speed = 5;

    this.move = function() {
        this.y += this.speed;
        if (this.speed >= 5) {
            this.speed = 5;
        }
        if (this.speed <= -5) {
            this.speed = -5;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y >= (canvas.height - 100)) {
            this.y = (canvas.height - 100);
        }
    }



    this.aI = function(roundThing) {
        if (this.y > roundThing) {
            this.y -= 2;
        } else if (this.y < roundThing) {
            this.y += 2;
        }

    }



    this.render = function() {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'yellow';
        context.fill();
        context.stroke();
    }




}

function Player(x, y) {
    this.paddle = new Paddle(x, y, 100, 5)

    this.render = function() {
        this.paddle.render();
    }
}

function Computer(x, y) {
    this.paddle = new Paddle(x, y, 100, 5)

    this.render = function() {
        this.paddle.render();
    }
}

  var resetSpeed =function(sped){
        sped=0;
       return sped;
    }

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;



   
    var upDownsetFirst = (Math.floor(Math.random() * 2));
    var isGoingUp = true;
    if (upDownsetFirst % 2 === 0) {
        isGoingUp = true;
    } else {
        isGoingUp = false;
    }
    this.goingUp = isGoingUp;


    
    var leftRightFirst = (Math.floor(Math.random() * 2));
    var isGoingDown= true
    if (leftRightFirst % 2 === 0) {
        isGoingDown = true;
    } else {
        isGoingDown = false;
    }

    this.goingLeft = isGoingDown;

    this.speedX = (1 + Math.floor(Math.random() * 2));
    this.speedY = (1 + Math.floor(Math.random() * 2));


    this.speedAndDirection = function() {
        resetSpeed(this.speedX);
        resetSpeed(this.speedY);
        this.speedX += (1 + Math.floor(Math.random() * 3));
        this.speedY += (1 + Math.floor(Math.random() * 3));
    }




    this.move = function() {

        if (this.y >= canvas.height - this.radius) {
            this.goingUp = true;
        }
        if (this.y <= this.radius) { 
            this.goingUp = false;
        }
        if (
            (this.y >= player.paddle.y) &&
            (this.y <= (player.paddle.y + player.paddle.height)) &&
            (this.x + this.radius >= player.paddle.x)) { //changing ball direction
            this.goingLeft = true;
            this.speedAndDirection();
        }

        if (
            (this.y >= computer.paddle.y) &&
            (this.y <= (computer.paddle.y + computer.paddle.height)) &&
            (this.x - this.radius <= computer.paddle.x)) { //changing ball direction
            this.goingLeft = false;
            this.speedAndDirection();
        }

        if (this.goingUp) {


            this.y += -this.speedY;
            bal = this.y - (computer.paddle.height / 2);
            computer.paddle.aI(bal);


        } else {

            this.y += this.speedY;
            bal = this.y - (computer.paddle.height / 2);
            computer.paddle.aI(bal);
        }

        if (this.goingLeft) {

            this.x += -this.speedX;
        } else {
            this.x += this.speedX;
        }


    }

    this.render = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.strokeStyle = 'red';
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    }

}

var inIt = function() {
    ball = new Ball((200 + Math.floor(Math.random() * 400)), (1 + Math.floor(Math.random() * 399)));
    computer = new Computer(10, 100);
    player = new Player((canvas.width - 20), canvas.height - 50);
}

var midline = function() {
    context.beginPath();
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

var resetScore = function(){
    humanScore=0;
    compScore=0;
    $('#computerScore').html(compScore);
    $('#humanScore').html(humanScore);


}

var endGame= function(){
    
    if(humanScore==3){
        alert("Congragulations you have beaten my AI am proved your seld superior. Click ok to play again, Only this time a little faster");
    }else{

        alert("Ahhhh Silly human I the computer and superior being have won. Click ok to play again, Only this time a little faster");
    }
    resetScore();
     inIt();
     animate(step);

}


var step = function(timestamp) {
    render();
    animate(step);
    if (ball.x <= 0) {
        humanScore++;
        $('#humanScore').html(humanScore);
           if(humanScore==3){
        endGame();
    }
        inIt();
    }
    if (ball.x >= canvas.width) {
        compScore++;
        $('#computerScore').html(compScore);
        if(compScore ==3){
        endGame();
        }
        inIt();
        }
}

var onKeyPress = function(event) {
    var keycode = event.keyCode;
    if (keycode == 38) {
        player.paddle.speed = -5;
    }
    if (keycode == 40) {
        player.paddle.speed = 5;
    }
    if (keycode == 32) {
        if (should_step) {
            player.paddle.move();
            ball.move();
            computer.paddle.aI(bal);
        }
    }

} 

window.onload = function() {
    inIt();
    animate(step);
    document.onkeydown = onKeyPress;
};

//first we initilize values of paddels and balls with inIt 
//then we call the animate function and pass in the step function as an argument
// the animate function calls the step function 
//the step function first calls the render function, 
// the render function calls  player.paddle.move, ball.render, computer.render, player.render
//the  player.paddle.move looks at the y value and adds the value passed in by the speed varible, the speed varible is set by the onKeyPress function (wich we are not getting into)
