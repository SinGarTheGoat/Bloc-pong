var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

context.beginPath();
    var paddelLeft = context.rect(10, 10, 10, 100);
    var paddelRight = context.rect(580, 10, 10, 100);
    //context.rect(188, 50, 200, 100);
    context.fillStyle = 'yellow';
    context.fill();
    context.stroke();

context.beginPath(); //midline
    context.moveTo(300, 600);
    context.lineTo(300, 0);
    context.lineWidth = 1;
    context.strokeStyle = '#ff0000';
    context.stroke();

context.beginPath();
    context.arc(350, 150, 50, 0, 2* Math.PI);
    context.strokeStyle = 'red';
    context.fillStyle = 'red';
    context.stroke();
    context.fill();
    context.closePath();




