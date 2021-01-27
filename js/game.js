var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var frog = new Image();
var bg = new Image();
var tonguehead = new Image();
var tonguebody = new Image();
var fly = new Image();

frog.src = "img/frog.png";
tonguehead.src = "img/tongue.png";
tonguebody.src = "img/tongue1.png";
fly.src = "img/fly.png"
bg.src = "img/bg.png";
var frogPosX = window.innerWidth/2;
var frogPosY = window.innerHeight * 8/10;
var tongues = [];
var n = 1;
var flyes = [];
var flyn = 1;
var score = 0;
var lost = 0;
var flag = 0;
var dx = window.innerWidth/506;
var dy = window.innerHeight/288;
var speed = dx * 1;

flyes[0] = {
    x : 0,
    y : 50 * dy + getRandomInt(50*dy),
    got : 0
}

tongues[0] = {
    x : frogPosX + 22 * dx,
    y : frogPosY + 20 * dy
}



window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    draw();
}
resizeCanvas();


function AddFly()
{
    flyn++;
    flyes.push({
        x : 0,
        y : 50 * dy + getRandomInt(50 * dy),
        got : 0
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
        shoot()
    }
    else if(event.code == 'KeyA' && interval_id == null)
        frogPosX -= 5 * dx;
    else if(event.code == 'KeyD' && interval_id == null)
        frogPosX += 5 * dx;
});

document.addEventListener('touchstart', function(event)
{
    shoot()

});



var interval_id;
function shoot()
{
    if(interval_id != null)
        return;
    interval_id = setInterval("tonguepush()", 5);
}

function tonguepush()
{
    if(n < 200)
    {
        n++;
        tongues.push({
            x: frogPosX + 22 * dx,
            y: tongues[tongues.length - 1].y - 1 * dy
        });
    }
    else {
        clearInterval(interval_id);
        interval_id = null;
        back()
    }

}

function back()
{
    for(let i = tongues.length; i > 1; i--)
    {
        tongues.pop();
        n--;
    }
    if(flag == 0)
        lost++;
    flag = 0;
}

function gotit(i)
{
    score++;
    flyes[i].got = 1;
    flag = 1;
}

function draw()
{
    ctx.drawImage(bg, 0, 0, window.innerWidth, window.innerHeight);
    ctx.drawImage(frog, frogPosX, frogPosY, 45 * dx, 45 * dy);

    for(let i = 1; i < tongues.length-1; i++)
    {
        ctx.drawImage(tonguebody, tongues[i].x, tongues[i].y, dx * 2, dy)
    }
    if(n>2)
        ctx.drawImage(tonguehead, tongues[tongues.length-1].x-1*dx, tongues[tongues.length-1].y-7*dy, 4*dx, 8*dy)
    for(let i = 0; i < flyn; i++)
    {
        if(flyes[i].got == 0)
            ctx.drawImage(fly, flyes[i].x, flyes[i].y, 20*dx, 20*dy)
        flyes[i].x += speed;
        if(tongues[tongues.length-1].x-2*dx > flyes[i].x && tongues[tongues.length-1].x+2*dx < flyes[i].x + 20*dx && tongues[tongues.length-1].y-4*dy > flyes[i].y
            && tongues[tongues.length-1].y+4*dy < flyes[i].y + 20*dy && flyes[i].got == 0)
        {
            gotit(i);
        }
    }


    ctx.fillStyle = "#000";
    ctx.font = dx*20+"px Verdana";
    ctx.fillText("Счет: " + score, 172*dx, 30*dx)

    if(lost == 3) {
        alert("Игра окончена, результат: " + score);
        lost = 0;
        score = 0;
        speed = 1*dx;
       // for(var i = 1; i < flyes.length - 1; i ++)
           // flyes.pop();
    }

    requestAnimationFrame(draw);
}

bg.onload = draw;
interval_id1 = setInterval("AddFly()", 1000);