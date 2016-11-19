var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var should_step = false;

var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 100 / 60)
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

    this.move = function() { //tried passing in key code
        this.y += this.speed;
        if (this.speed >= 5) {
            this.speed = 5;
        }
        if (this.speed <= -5) {
            this.speed = -5;
        }
        if (this.y < 0) {
            //   console.log('wezzzzzz in move "if"')
            this.y = 0;
        }
        if (this.y >= (canvas.height - 100)) {
            this.y = (canvas.height - 100);
        }
    }



    this.aI = function(roundThing) {
        if (this.y > roundThing) {

//                        if(this.y<0){      // trying to not make it bleed off screen
//                            this.y=0;
//                            console.log("SOOOooo")
//                        }

            //console.log("first if comp paddel = "+computer.paddle.y );
            this.y -= 2;
        } else if (this.y < roundThing) {


//////                        trying to not make it bleed off screen
//                        if(this.y=canvas.height-100){
//                         this.y=(canvas.height-100);
//                        }



            this.y += 2;
            // console.log("2nd if comp paddel = "+computer.paddle.y );

        }

    }

    //    
    //     this.aI = function(roundThing){
    //        if(computer.paddle.y >roundThing){
    //            if(computer.paddle.y)
    //             console.log("first if comp paddel = "+computer.paddle.y );
    //            computer.paddle.y-=1;
    //        }else if(computer.paddle.y <roundThing){
    //            computer.paddle.y+=1;
    //            console.log("2nd if comp paddel = "+computer.paddle.y );
    //            
    //        }
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

function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15 //(1 + Math.floor(Math.random() * 20));



    //do I start this with a question mark?
    var upDownsetFirst = (Math.floor(Math.random() * 2));
    var AAAAAA = true;
    if (upDownsetFirst % 2 === 0) {
        AAAAAA = true;
    } else {
        AAAAAA = false;
    }
    this.goingUp = AAAAAA;


    //trying to make the ball start random
    var leftRightFirst = (Math.floor(Math.random() * 2));
    var HHHHHH= true
    if (leftRightFirst % 2 === 0) {
        HHHHHH = true;
    } else {
        HHHHHH = false;
    }

    this.goingLeft = HHHHHH;

    this.speedX = (1 + Math.floor(Math.random() * 4));
    this.speedY = (1 + Math.floor(Math.random() * 4));
    //I should be able to eleminate some of these lines

    this.speedAndDirection = function() {
        this.speedX = 0;
        this.speedY = 0;

        this.speedX = (1 + Math.floor(Math.random() * 8));
        this.speedY = (1 + Math.floor(Math.random() * 8));
        console.log("speedX= " + this.speedX + " & SpeedY= " + this.speedY);
    }




    this.move = function() {
        // collision detection
        // borders
        if (this.y >= canvas.height - this.radius) { //deals with the bottom border for some fucking reason
            //console.log("in first if statement")
            this.goingUp = true;
            // velocityBall();
            //return
        }
        if (this.y <= this.radius) { //deals with the top border for some fucking reason
            // console.log("in 2nd if statement")
            this.goingUp = false;
            //velocityBall();
            //return
        }

        // player paddle
        if (
            (this.y >= player.paddle.y) &&
            (this.y <= (player.paddle.y + player.paddle.height)) &&
            (this.x + this.radius >= player.paddle.x)) { //changing ball direction
            this.goingLeft = true;
            this.speedAndDirection();

            
        }


        //Computer paddel
        if (
            (this.y >= computer.paddle.y) &&
            (this.y <= (computer.paddle.y + computer.paddle.height)) &&
            (this.x - this.radius <= computer.paddle.x)) { //changing ball direction
            this.goingLeft = false;
            this.speedAndDirection();
        }

        // move ball
        if (this.goingUp) {


            this.y += -this.speedY;
            bal = this.y - (computer.paddle.height / 2);
            //console.log("bal is" +bal+"first if ");
            computer.paddle.aI(bal);


        } else {

            this.y += this.speedY;
            bal = this.y - (computer.paddle.height / 2);
            //console.log("bal is" +bal+" 2nd if ");
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

var step = function(timestamp) {
    render();
    animate(step);
    if (ball.x <= 0) {
        humanScore++;
        $('#humanScore').html(humanScore);
//        alert("Human won the game  computer has score of " + compScore + " Human score is  " + humanScore);
        inIt();
        animate(step);
    }
    if (ball.x >= canvas.width) {
        compScore++;
//        alert("computer won the game computer has score of " + compScore + " Human score is  " + humanScore);
        $('#computerScore').html(compScore);
        inIt();
        animate(step);
    }

}

var onKeyPress = function(event) {
    var keycode = event.keyCode;
    if (keycode == 38) { //38= uparrow
        player.paddle.speed = -5;
    }
    if (keycode == 40) { //40= down arrow
        player.paddle.speed = 5;
    }
    if (keycode == 32) { //32==space
        // step move
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