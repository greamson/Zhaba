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
var frogPosX = 231;
var frogPosY = 230;
var tongues = [];
var n = 1;
var speed = 2;
var flyes = [];
var flyn = 1;
var score = 0;
var lost = 0;
var flag = 0;
alert(navigator.userAgent);
flyes[0] = {
    x : 0,
    y : 50 + getRandomInt(50),
    got : 0
}

tongues[0] = {
    x : frogPosX + 22,
    y : frogPosY + 20
}

function AddFly()
{
    flyn++;
    flyes.push({
        x : 0,
        y : 50 + getRandomInt(50),
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
        frogPosX -= 5;
    else if(event.code == 'KeyD' && interval_id == null)
        frogPosX += 5;
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
            x: frogPosX + 22,
            y: tongues[tongues.length - 1].y - 1
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
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(frog, frogPosX, frogPosY);

    for(let i = 1; i < tongues.length-1; i++)
    {
        ctx.drawImage(tonguebody, tongues[i].x, tongues[i].y)
    }
    if(n>2)
        ctx.drawImage(tonguehead, tongues[tongues.length-1].x-1, tongues[tongues.length-1].y-7)
    for(let i = 0; i < flyn; i++)
    {
        if(flyes[i].got == 0)
            ctx.drawImage(fly, flyes[i].x, flyes[i].y)
        flyes[i].x += speed;
        if(tongues[tongues.length-1].x-2 > flyes[i].x && tongues[tongues.length-1].x+2 < flyes[i].x + 20 && tongues[tongues.length-1].y-4 > flyes[i].y
            && tongues[tongues.length-1].y+4 < flyes[i].y + 20 && flyes[i].got == 0)
        {
            gotit(i);
        }
    }


    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Счет: " + score, 172, 30)

    if(lost == 3) {
        alert("Игра окончена, результат: " + score);
        lost = 0;
        score = 0;
        speed = 2;
        for(var i = 1; i < flyes.length - 1; i ++)
            flyes.pop();
    }

    requestAnimationFrame(draw);
}

bg.onload = draw;
interval_id1 = setInterval("AddFly()", 1000);
