//переменные
var canvas, ctx;
var oRocketImage;
var oEnemyImage;
var backgroundImage;
var backgroundImage1;
var backImage;
var iBgShiftX = 100;
var button;
var button1;
var button2;
var button3;
var button4;
var pausebutton;
var button5;
var button6;
var helpbutton;
var Continuepbutton;
var NewGamepbutton;
var playerbutton;
var Okbutton;
var Ok2button;
var exitbutton;
var Soundbutton;
var bDrawDialog = true;
var iDialogPage = 1;
var pauseclick = 0;
var Soundbuttonclick = 0;
var oExplosionImage;
var oCloudImage;
var oBadoblakoImage;
var oStarsImage;
var oCoinsImage;
var oBottleImage;
var tmpImg = null;
var changePlane = false;
var ichgplayer = false;
var imsg = false;
var Levelmsg = false;
var chgp = 1; //изменение номера выбранного самолета
var Numchgplayer = 1; //изменение номера выбранного игрока
var ilevel = 1; //номер уровня
var levelEnd = false; //по умолчанию уровень не окончен
var ibestScore1 = 0; //лучшие очки на 1-ом уровне
var ibestScore2 = 0; //лучшие очки на 2-ом уровне
var chglevel = false; //по умолчанию выбран 1 уровень
var Numchglevel = 1; //изменение номера выбранного уровня
var Changelevel = false; //изменение уровня (пункт меню)
var flag = 0;
var Changeplayer = false;

var iBgShiftY = 9300; //10000 (level length) - 700 (canvas height)
var bPause = false; // game pause
var stars = null; // stars object
var coins = null; // coins object
var plane = null; // plane object
var clouds = []; // array of clouds
var explosions = []; // array of explosions
var badoblako = []; // array of badoblako
var stars = []; // array of stars
var coins = []; // array of coins
var bottle = [];
var rockets = []; // array of rockets
var enemies = []; // array of enemies
var iEnemyW = 151; // enemy width
var iEnemyH = 129; // enemy height
var iBottleW = 40;
var iBottleH = 45;
var planeW = window.screen.width / 16 ; // plane width
var planeH = window.screen.h / 7; // plane height
var iSprPos = 1; // initial sprite frame for plane
var iMoveDir = 1; // move direction
var iCloudW = 137; // cloud width
var iCloudH = 77; // cloud height
var iBadoblakoW = 174; // badoblako width
var iBadoblakoH = 125; // badoblako height
var istarW = 20; // star width
var istarH = 20; // star height
var icoinW = 100; // star width
var icoinH = 100; // star height
var iRocketSpeed = 10; // initial rocket speed
var iCloudSpeed = 1; // initial cloud speed
var iRocketSpeed = 10; // initial rocket speed
var iEnemySpeed = 3; // initial enemy speed
var iCloudSpeedMin = 2; // минимальная скорость облака
var iCloudSpeedMax = 3; //максимальная скорость облака
var pressedKeys = []; // array of pressed keys
var iScore = 0; // total score
var points = 0; // очки
var iLife = 100; // total life of plane
var iDamage = 10; // damage per cloud plane
var enTimer = null; // random timer for a new cloud
var bplane = false; //выбор самолета
var iplane = 1; //по умолчанию - 1 самолет
var isSave = false; // по умолчанию игра не сохранена
var icoinNumber = 0; //количество монет
var isEnd = false; // по умолчанию игра не окончена
var iplayer = 1; //по умолчанию - игрок 1
var PlaySound = true; //по умолчанию звук включен
// ------------------------------------------------------------



// объекты:
function Button(x, y, w, h, state, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.imageShift = 0;
    this.image = image;
    this.visible = true;
}

function Plane(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.bDrag = false;
}

function Rocket(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}
function Enemy(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}

function Cloud(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}

function Explosion(x, y, w, h, sprite, image) {
 this.x = x;
 this.y = y;
 this.w = w;
 this.h = h;
 this.sprite = sprite;
 this.image = image;
 }
 
function Bottle(x, y, w, h, sprite, image, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
    this.speed = speed;
} 

function Badoblako(x, y, w, h, sprite, image, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
    this.speed = speed;
}

function Stars(x, y, w, h, sprite, image, speed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
    this.speed = speed;
}

function Coins(x, y, w, h, sprite, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
}

// -------------------------------------------------------------
// получить случайное число между X и Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}
// Display Intro function
function displayIntro() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.drawImage(introImage, 0, 0,700, 700);
    setInterval(drawScene, 20); // loop drawScene
    coins.push(new Coins(ctx.canvas.width/2 + 120, 545, icoinW, icoinH, 0 , oCoinsImage));
    stars.push(new Stars(ctx.canvas.width / 2 + 120, 545, istarW, istarH, 0, oStarsImage));
}
function Generate()
{
         // and add first cloud
         addCloud();
         addEnemy();
         setInterval(function(){
              addRockets();
                 var rand = Math.random()*100;
                 if(rand  <= 45 && !bDrawDialog && !bPause){
                       addCloud(); 
                       addStars(); 
                 } else if(rand  <= 70 && !bDrawDialog && !bPause) {
                     addBadoblako();
                     addStars();
                     addEnemy();
                     addBottle();
                 }
            },500);
            
}
function addRockets() {
    clearInterval(enTimer);
    rockets.push(new Rocket(plane.x - 16, plane.y - plane.h + 50, 13, 33, iRocketSpeed, oRocketImage));
    var interval = getRand(900, 1000);
    enTimer = setInterval(addRockets, interval); // повторение кадров   
}

    // Add Cloud function (adds a new cloud randomly)
    function addCloud() {
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iCloudH);
  //  var chanse = getRand(0,100);
    //if(chanse <= 20 && !bDrawDialog && !bPause)
        //{
          clouds.push(new Cloud(randX, 0, iCloudW, iCloudH, - getRand(iCloudSpeedMin, iCloudSpeedMax), oCloudImage)); //скорость теперь настраивается переменными
        //}
    var interval = getRand(900, 1000);
   // var interval = getRand(5000, 10000);
    enTimer = setInterval(addCloud, interval); // повторение кадров
    }
    
    function addBadoblako() {
   // clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iBadoblakoH);
    badoblako.push(new Badoblako(randX, 0, iBadoblakoW, iBadoblakoH, 0 , oBadoblakoImage, -iCloudSpeed));

    //var interval = getRand(1000, 2000);
    //enTimer = setInterval(addBadoblako, interval); // loop
}

// Add Enemy function (adds a new enemy randomly)
function addEnemy() {
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iEnemyH);
    enemies.push(new Enemy(randX, 0, iEnemyW, iEnemyH, - iEnemySpeed, oEnemyImage));

    var interval = getRand(900, 1000);
    enTimer = setInterval(addEnemy, interval); // loop
}

function addStars() {
            //for (var ekey in enemies){    
            var rand1 = Math.random()*100; 
                if (rand1 <=40){ 
                    for (var okey in badoblako) {
                        if (badoblako[okey] != undefined) {
                             //var rand2 = Math.random()*100;
//                             console.log( badoblako[okey].x);
                                if(badoblako[okey].x < 400){
                                    var randX = getRand((badoblako[okey].x + badoblako[okey].w), 550);
                                }else 
                                    var randX = getRand(0, badoblako[okey].x);     
                        }
                    }
                } else if(rand1 <=60){
                    for (var ekey in clouds){
                        if (clouds[ekey] != undefined){
                            if(clouds[ekey].x < 400){
                                var randX = getRand((clouds[ekey].x + clouds[ekey].w), 550);
                            }else 
                                var randX = getRand(0, clouds[ekey].x);
                        }
                    }  
                } else 
                    var randX = getRand(0, canvas.height); 
//    console.log(randX); 

    stars.push(new Stars(randX, 0, istarW, istarH, 0 , oStarsImage, -iCloudSpeed));
}

function addBottle(){
      var randomX = getRand(0, canvas.height - iBottleH);
      if (iLife < 50) {
                    var rand1 = Math.random()*100; 
                if (rand1 <=40){ 
                    for (var okey in badoblako) {
                        if (badoblako[okey] != undefined) {
                                if(badoblako[okey].x < 400){
                                    var randX = getRand((badoblako[okey].x + badoblako[okey].w), 550);
                                }else 
                                    var randX = getRand(0, badoblako[okey].x);     
                        }
                    }
                } else if(rand1 <=60){
                    for (var ekey in clouds){
                        if (clouds[ekey] != undefined){
                            if(clouds[ekey].x < 400){
                                var randX = getRand((clouds[ekey].x + clouds[ekey].w), 550);
                            }else 
                                var randX = getRand(0, clouds[ekey].x);
                        }
                    }  
                } else 
        bottle.push(new Bottle(randomX, 0, iBottleW, iBottleH, 0,oBottleImage, -iCloudSpeed));
      }
    }

    
    //отрисовка полупрозрачного градиента
    function drawGradient()
    {
          var bg_gradient = ctx.createLinearGradient(0, 300, 0, 800);
          bg_gradient.addColorStop(0.0, 'rgba(202, 202, 202, 0.2)');
          bg_gradient.addColorStop(1.0, 'rgba(128, 126, 128, 0.2)');

          ctx.beginPath(); // начало фигуры
          ctx.fillStyle = bg_gradient;
          ctx.moveTo(0, 0);
          ctx.lineTo(ctx.canvas.width - 2, 0);
          ctx.lineTo(ctx.canvas.width - 2, ctx.canvas.height - 2);
          ctx.lineTo(0, ctx.canvas.height - 2);
          ctx.lineTo(0, 0);
          ctx.closePath(); // конец фигуры
          ctx.fill(); // заполнение фигуры*
    }
    
    function NoSave()
    {
       iBgShiftY = 9300;
       iScore = 0;
       iLife = 100;
       for (var ekey in clouds) {
       if (clouds[ekey] !== undefined)
          delete clouds[ekey];
       }
       for (var okey in badoblako) {
         if (badoblako[okey] !== undefined)
           delete badoblako[okey];
          }
       for (var skey in stars) {
         if (stars[skey] !== undefined) 
            delete stars[skey];
         }
       for (var bkey in bottle) {
         if (bottle[bkey] !== undefined)
         delete bottle[bkey];
       }
    }

//отрисовка окна сообщения
function MessageNotEnoughCoins()
{
    var bg_gradient = ctx.createLinearGradient(0, 300, 0, 800);
    bg_gradient.addColorStop(0.0, 'rgba(202, 202, 202, 0.3)');
    bg_gradient.addColorStop(1.0, 'rgba(128, 126, 128, 0.3)');

    ctx.beginPath(); // начало фигуры
    ctx.fillStyle = bg_gradient;
    ctx.moveTo((ctx.canvas.width - 2) / 2 - 200, (ctx.canvas.height - 2) / 2 - 220);
    ctx.lineTo((ctx.canvas.width - 2) / 2 - 200, (ctx.canvas.height - 2) / 2 + 20);
    ctx.lineTo((ctx.canvas.width - 2) / 2 + 200, (ctx.canvas.height - 2) / 2 + 20);
    ctx.lineTo((ctx.canvas.width - 2) / 2 + 200, (ctx.canvas.height - 2) / 2 - 220);
    ctx.lineTo((ctx.canvas.width - 2) / 2 - 200, (ctx.canvas.height - 2) / 2 - 220);
    ctx.closePath(); // конец фигуры
    ctx.fill(); // заполнение фигуры
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
    ctx.strokeRect(ctx.canvas.width / 2 - 200, ctx.canvas.height / 2 - 220, 400, 240);
    ctx.font = '24px DejaVuSansCondensed';
    ctx.fillStyle = '#fff';
    ctx.fillText('Недостаточно монет', ctx.canvas.width / 2, ctx.canvas.height / 2 - 180);
    ctx.fillText('для покупки этого', ctx.canvas.width / 2, ctx.canvas.height / 2 - 150);
    ctx.fillText('самолета', ctx.canvas.width / 2, ctx.canvas.height / 2 - 120);
}

//отрисовка окна подсказок
function MessageHints()
{
    var bg_gradient = ctx.createLinearGradient(0, 300, 0, 800);
    bg_gradient.addColorStop(0.0, 'rgba(202, 202, 202, 0.3)');
    bg_gradient.addColorStop(1.0, 'rgba(128, 126, 128, 0.3)');

    ctx.beginPath(); // начало фигуры
    ctx.fillStyle = bg_gradient;
    ctx.moveTo((ctx.canvas.width - 2) / 2 - 300, (ctx.canvas.height - 2) / 2 - 275);
    ctx.lineTo((ctx.canvas.width - 2) / 2 - 300, (ctx.canvas.height - 2) / 2 + 200);
    ctx.lineTo((ctx.canvas.width - 2) / 2 + 300, (ctx.canvas.height - 2) / 2 + 200);
    ctx.lineTo((ctx.canvas.width - 2) / 2 + 300, (ctx.canvas.height - 2) / 2 - 275);
    ctx.lineTo((ctx.canvas.width - 2) / 2 - 300, (ctx.canvas.height - 2) / 2 - 275);
    ctx.closePath(); // конец фигуры
    ctx.fill(); // заполнение фигуры
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.5)';
    ctx.strokeRect(ctx.canvas.width / 2 - 300, ctx.canvas.height / 2 - 275, 600, 475);
    ctx.font = '24px DejaVuSansCondensed';
    ctx.fillStyle = '#fff';
    ctx.fillText('Управляйте самолетом', ctx.canvas.width / 2 - 150, 120);
    ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 + 30, plane.y - plane.h / 2 - 430, plane.w / 2, plane.h / 2);
    ctx.fillText(', передвигая его влево', ctx.canvas.width / 2 + 150, 120);
    ctx.fillText('и вправо на экране. Столкновение с врагами', ctx.canvas.width / 2 - 40, 180);
    ctx.drawImage(oEnemyImage, ctx.canvas.width / 2 + 180, ctx.canvas.height / 2 - 190, iEnemyW / 2, iEnemyH / 2);
    ctx.fillText('и', ctx.canvas.width / 2 + 260, 180);
    ctx.fillText('грозовыми облаками', ctx.canvas.width / 2 - 160, 240);
    ctx.drawImage(oBadoblakoImage, 0, 0, iBadoblakoW, iBadoblakoH, ctx.canvas.width / 2 - 40, ctx.canvas.height / 2 - 125, iBadoblakoW / 2, iBadoblakoH / 2);
    ctx.fillText('отнимает 10% топлива.', ctx.canvas.width / 2 + 160, 240);
    ctx.fillText('1 звездочка', ctx.canvas.width / 2 - 210, 300);
    ctx.drawImage(oStarsImage, 0, 0, istarW * 2, istarH * 2, ctx.canvas.width / 2 - 155, ctx.canvas.height / 2 - 50, istarW * 2, istarH * 2);
    ctx.fillText('= 10 очков.', ctx.canvas.width / 2 - 45, 300);
    ctx.fillText('100 очков = 1, 300 = 2 и', ctx.canvas.width / 2 + 140, 300);
    ctx.fillText('700 = 3 монеты', ctx.canvas.width / 2 - 190, 360);
    ctx.drawImage(oCoinsImage, 0, 0, icoinW, icoinH, ctx.canvas.width / 2 - 100, 355, icoinW / 2.5, icoinH / 2.5);
    ctx.fillText('. 1 бак', ctx.canvas.width / 2 - 20, 360);
    ctx.drawImage(oBottleImage, 0, 0, iBottleW, iBottleH, ctx.canvas.width / 2 + 20, 350, iBottleW, iBottleH);
    ctx.fillText('= 20% топлива.', ctx.canvas.width / 2 + 145, 360);
    ctx.fillText('Попадание ракетой', ctx.canvas.width / 2 - 165, 420);
    ctx.drawImage(oRocketImage, ctx.canvas.width / 2 - 50, 415);
    ctx.fillText('во врага  = 10% топлива.', ctx.canvas.width / 2 + 105, 420);
    // ctx.drawImage(oCloudImage, ctx.canvas.width / 2 + 180, ctx.canvas.height / 2 - 190, iCloudW / 2, iCloudH / 2);
}

//отрисовка окна выбора уровня
function Levels()
{
    var bg_gradient = ctx.createLinearGradient(0, 300, 0, 800);
    bg_gradient.addColorStop(0.0, 'rgba(202, 202, 202, 0.3)');
    bg_gradient.addColorStop(1.0, 'rgba(128, 126, 128, 0.3)');

    ctx.beginPath(); // начало фигуры
    ctx.fillStyle = bg_gradient;
    ctx.moveTo((ctx.canvas.width - 2) / 2 - 300, (ctx.canvas.height - 2) / 2 - 300);
    ctx.lineTo((ctx.canvas.width - 2) / 2 - 300, (ctx.canvas.height - 2) / 2 + 200);
    ctx.lineTo((ctx.canvas.width - 2) / 2 + 300, (ctx.canvas.height - 2) / 2 + 200);
    ctx.lineTo((ctx.canvas.width - 2) / 2 + 300, (ctx.canvas.height - 2) / 2 - 300);
    ctx.lineTo((ctx.canvas.width - 2) / 2 - 300, (ctx.canvas.height - 2) / 2 - 300);
    ctx.closePath(); // конец фигуры
    ctx.fill(); // заполнение фигуры
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(224, 224, 224, 0.5)';
    ctx.strokeRect(ctx.canvas.width / 2 - 300, ctx.canvas.height / 2 - 300, 600, 500);
    
    ctx.font = '25px DejaVuSansCondensed';
    ctx.fillStyle = '#fff';
    ctx.fillText('Выбор уровня', ctx.canvas.width / 2, ctx.canvas.height / 2 - 280);
    if(!Levelmsg)
    {
        // информация об уровне
        ctx.font = '25px DejaVuSansCondensed';
        ctx.fillStyle = '#fff';
        ctx.fillText("Уровень " + ilevel, ctx.canvas.width / 2, ctx.canvas.height / 2 - 180);
        ctx.fillText('Best score:', ctx.canvas.width / 2, ctx.canvas.height / 2 - 120);
        ctx.font = '30px DejaVuSansCondensed';
        ctx.fillStyle = '#fff';
        ctx.fillText(icoinNumber, ctx.canvas.width / 2 + 213, ctx.canvas.height / 2 - 123);
        ctx.fillText('/ ', ctx.canvas.width / 2 + 235, ctx.canvas.height / 2 - 123);
        if (ilevel == 1)
        {
            ctx.fillText(ibestScore1, ctx.canvas.width / 2, ctx.canvas.height / 2 - 70);
            ctx.fillText('0', ctx.canvas.width / 2 + 247, ctx.canvas.height / 2 - 123);
        }
        else if (ilevel == 2)
        {
            ctx.fillText(ibestScore2, ctx.canvas.width / 2, ctx.canvas.height / 2 - 70);
            ctx.fillText('3', ctx.canvas.width / 2 + 247, ctx.canvas.height / 2 - 123);
        }
        if (!chglevel)
        {
           ctx.lineWidth = 2;
           ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
           ctx.strokeRect(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 200, 200, 200);
           Ok2button.visible = false;
        }
        else
        {
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'rgba(255, 255, 204, 0.4)';
            ctx.strokeRect(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 200, 200, 200);
            Ok2button.visible = true;
        }
        ctx.font = '24px DejaVuSansCondensed';
        ctx.fillStyle = '#fff';
      //  ctx.fillText('x ', ctx.canvas.width / 2 + 215, ctx.canvas.height / 2 - 120);
        //draw coins
        if (coins.length > 0) {
            for (var skey in coins) {
                if (coins[skey] !== undefined) {
                    ctx.drawImage(coins[skey].image, coins[skey].sprite * coins[skey].w, 0, coins[skey].w, coins[skey].h, ctx.canvas.width / 2 + 150, ctx.canvas.height / 2 - 130, coins[skey].w / 2, coins[skey].h / 2);
                    coins[skey].sprite++;
                    if (coins[skey].sprite > 9) {
                        coins[skey].sprite = 0;
                    }
                }
            }
        }
    }
    else
    {
        var bg_gradient = ctx.createLinearGradient(0, 300, 0, 800);
        bg_gradient.addColorStop(0.0, 'rgba(202, 202, 202, 0.3)');
        bg_gradient.addColorStop(1.0, 'rgba(128, 126, 128, 0.3)');

        ctx.beginPath(); // начало фигуры
        ctx.fillStyle = bg_gradient;
        ctx.moveTo((ctx.canvas.width - 2) / 2 - 200, (ctx.canvas.height - 2) / 2 - 220);
        ctx.lineTo((ctx.canvas.width - 2) / 2 - 200, (ctx.canvas.height - 2) / 2 + 20);
        ctx.lineTo((ctx.canvas.width - 2) / 2 + 200, (ctx.canvas.height - 2) / 2 + 20);
        ctx.lineTo((ctx.canvas.width - 2) / 2 + 200, (ctx.canvas.height - 2) / 2 - 220);
        ctx.lineTo((ctx.canvas.width - 2) / 2 - 200, (ctx.canvas.height - 2) / 2 - 220);
        ctx.closePath(); // конец фигуры
        ctx.fill(); // заполнение фигуры
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
        ctx.strokeRect(ctx.canvas.width / 2 - 200, ctx.canvas.height / 2 - 220, 400, 240);
        ctx.font = '22px DejaVuSansCondensed';
        ctx.fillStyle = '#fff';
        ctx.fillText('Недостаточно монет', ctx.canvas.width / 2, ctx.canvas.height / 2 - 180);
        ctx.fillText('для покупки этого', ctx.canvas.width / 2, ctx.canvas.height / 2 - 150);
        ctx.fillText('уровня', ctx.canvas.width / 2, ctx.canvas.height / 2 - 120);
        
        Okbutton.visible = true;
    }
}
// фукнции отрисовки :
function clear() { // функция очистки canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawDialog() { // функция отрисовки диалога
    if (bDrawDialog) {
        // draw background
        ctx.drawImage(backImage, 0, 0, 700, 700, 0, 0, 700, 700);
        drawGradient();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
        ctx.stroke(); // отрисовка границы
        // отрисовка текста
        ctx.font = 'italic bold 65px DejaVuSansCondensed';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = '#000';
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.shadowBlur = 3;
        ctx.fillStyle = '#F4F3FC';
        if (iDialogPage === 1) {
            ctx.fillText('Airplanes', ctx.canvas.width/2, ctx.canvas.height/2 - 280);
            button.visible=true;
            button1.visible=true;
            button2.visible = false;
            button3.visible = false;
            button4.visible = false;
            pausebutton.visible = false;
            button5.visible = false;
            button6.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            NewGamepbutton.visible = false;
            playerbutton.visible = true;
            exitbutton.visible = true;
            Soundbutton.visible = false;
            if (!isSave)
            {
               Continuepbutton.visible=false;
            }
            else
            { 
                Continuepbutton.visible=true;
            }
        } else if (iDialogPage === 2) {
            ctx.fillText('Выбор самолета', ctx.canvas.width / 2, ctx.canvas.height / 2 - 300);
            button.visible=false;
            button1.visible=false;
            button2.visible = true;
            button3.visible = true;
            button4.visible = true;
            pausebutton.visible = false;
            playerbutton.visible = false;
            button5.visible = false;
            button6.visible = false;
            helpbutton.visible = false;
            NewGamepbutton.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false;
            Soundbutton.visible = false;
            // draw plane
            tmpImg = new Image();
            if (iplane == 1)
            {
                tmpImg.src = 'images/plan.png';
                plane.image.src = tmpImg.src;
                ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
            }
            if (iplane == 2)
            {
                tmpImg.src = 'images/plan2.png';
                plane.image.src = tmpImg.src;
                ctx.drawImage(plane.image, iSprPos * plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
            }
            if (!bplane)
            {
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
                ctx.strokeRect(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 200, 200, 200);
            }
            else
            {
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'rgba(255, 255, 204, 0.4)';
                ctx.strokeRect(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 200, 200, 200);
            }
            ctx.font = '30px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
            ctx.fillText(icoinNumber, ctx.canvas.width / 2 + 264, ctx.canvas.height / 2 - 123);
            ctx.fillText('/ ', ctx.canvas.width / 2 + 287, ctx.canvas.height / 2 - 123);
            if (iplane == 1)
            {
                ctx.fillText('0', ctx.canvas.width / 2 + 300, ctx.canvas.height / 2 - 123);
            }
            if (iplane == 2)
            {
                ctx.fillText('3', ctx.canvas.width / 2 + 300, ctx.canvas.height / 2 - 123);
            }
            ctx.font = '24px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
           // ctx.fillText('x ', ctx.canvas.width / 2 + 265, ctx.canvas.height / 2 - 120);
            //draw coins
            if (coins.length > 0) {
                for (var skey in coins) {
                    if (coins[skey] !== undefined) {
                        ctx.drawImage(coins[skey].image, coins[skey].sprite * coins[skey].w, 0, coins[skey].w, coins[skey].h, ctx.canvas.width / 2 + 200, ctx.canvas.height / 2 - 130, coins[skey].w / 2, coins[skey].h / 2);
                        coins[skey].sprite++;
                        if (coins[skey].sprite > 9) {
                            coins[skey].sprite = 0;
                        }
                    }
                }
            }
        }
        else if (iDialogPage === 3) {
            ctx.fillText('Справка', ctx.canvas.width / 2, ctx.canvas.height / 2 - 300);
            button.visible=false;
            button1.visible=false;
            button2.visible = true;
            button3.visible = false;
            button4.visible = false;
            pausebutton.visible = false;
            playerbutton.visible = false;
            button5.visible = false;
            button6.visible = false;
            helpbutton.visible = false;
            NewGamepbutton.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false;
            Soundbutton.visible = false;
            ctx.font = '24px DejaVuSansCondensed';
            ctx.fillText('Управляйте самолетом ', ctx.canvas.width / 2 - 150, 190);
            ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 + 30, plane.y - plane.h / 2 - 360, plane.w / 2, plane.h / 2);
            ctx.fillText(', передвигая его влево и', ctx.canvas.width / 2 + 165, 190);
            ctx.fillText('вправо. Избегайте столкновения с врагами', ctx.canvas.width / 2 - 59, 250);
            ctx.drawImage(oEnemyImage, ctx.canvas.width / 2 + 160, ctx.canvas.height / 2 - 130, iEnemyW / 2, iEnemyH / 2);
            ctx.fillText('и зонами', ctx.canvas.width / 2 + 270, 250);
            ctx.fillText('турбулентности ', ctx.canvas.width / 2 - 195, 300);
            ctx.drawImage(oBadoblakoImage, 0, 0, iBadoblakoW, iBadoblakoH, ctx.canvas.width / 2 - 105, ctx.canvas.height / 2 - 65, iBadoblakoW / 2, iBadoblakoH / 2);
            ctx.fillText('. Собирайте звездочки ', ctx.canvas.width / 2 + 100, 300);
            ctx.drawImage(oStarsImage, 0, 0, istarW * 2, istarH * 2, ctx.canvas.width / 2 + 210, ctx.canvas.height / 2 - 50, istarW * 2, istarH * 2);
            ctx.fillText('для ', ctx.canvas.width / 2 + 285, 300);
            ctx.fillText('накопления очков и получения монет', ctx.canvas.width / 2 - 85, 350);
            ctx.drawImage(oCoinsImage, 0, 0, icoinW, icoinH, ctx.canvas.width / 2 + 120, 345, icoinW / 2.5, icoinH / 2.5);
            ctx.fillText('и баки с', ctx.canvas.width / 2 + 210, 350);
            ctx.fillText('топливом', ctx.canvas.width / 2 - 230, 400);
            ctx.drawImage(oBottleImage, 0, 0, iBottleW, iBottleH, ctx.canvas.width / 2 - 170, 390, iBottleW, iBottleH);
            ctx.fillText('для пополнения топлива самолета.', ctx.canvas.width / 2 + 65, 400);
          }
          else if (iDialogPage === 4) {
            button.visible = false;
            button1.visible = false;
            button2.visible = false;
            button3.visible = false;
            button4.visible = false;
            button5.visible = true;
            button6.visible = true;
            pausebutton.visible = false;
            playerbutton.visible = false;
            helpbutton.visible = false;
            NewGamepbutton.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false;
            Soundbutton.visible = false;
            // draw score
            ctx.font = '28px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
            points = iScore * 10;
            ctx.fillText('Game over, your score: ' + points + ' points', ctx.canvas.width / 2, ctx.canvas.height / 2 - 250);
            //setValue(points, iScore * 10, true, 10, 1);
            ctx.fillText('x ', ctx.canvas.width / 2 + 10, ctx.canvas.height / 2 - 185);
            if (points >= 700)
            {
                points = points - 700;
                icoinNumber = 6;
            }
            else if (points >= 300)
            {
                points = points - 300;
                icoinNumber = 3;
            }
            else if (points >= 100)
            {
                points = points - 100;
                icoinNumber = 1;
            }
            if (ilevel == 1)
            {
               if (points > ibestScore1)
               {
                  ibestScore1 = points;
               }
            }
            else if (ilevel == 2)
            {
               if (points > ibestScore2)
               {
                  ibestScore2 = points;
               }
            }
            ctx.font = '35px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
            ctx.fillText(icoinNumber, ctx.canvas.width / 2 + 40, ctx.canvas.height / 2 - 190);
            //draw coins
            if (coins.length > 0) {
                for (var skey in coins) {
                    if (coins[skey] !== undefined) {
                        ctx.drawImage(coins[skey].image, coins[skey].sprite * coins[skey].w, 0, coins[skey].w, coins[skey].h, ctx.canvas.width / 2 - 60, ctx.canvas.height / 2 - 190, coins[skey].w / 2, coins[skey].h / 2);
                        coins[skey].sprite++;
                        if (coins[skey].sprite > 9) {
                            coins[skey].sprite = 0;
                        }
                    }
                }
            }
            ctx.font = '25px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
            ctx.fillText("Имя игрока:", ctx.canvas.width / 2 - 50, ctx.canvas.height / 2 - 110);
            ctx.fillStyle = '#F4F3FC';
            ctx.fillText("Игрок " + Numchgplayer, ctx.canvas.width / 2 + 70, ctx.canvas.height / 2 - 110);
            if (flag == 0)
            {
                if (PlaySound && iScore !== 0)
                {
                    Over_Sound = new Audio('media/Flagnab.wav');
                    Over_Sound.volume = 0.9;
                    Over_Sound.play();
                }
            }
            flag = 1;
        }
        else if (iDialogPage === 5) {
            ctx.fillText('Смена игрока', ctx.canvas.width / 2, ctx.canvas.height / 2 - 300);
            button.visible = false;
            button1.visible = false;
            button2.visible = true;
            button3.visible = true;
            button4.visible = true;
            pausebutton.visible = false;
            button5.visible = false;
            button6.visible = false;
            helpbutton.visible = false;
            playerbutton.visible = false;
            NewGamepbutton.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false;
            Soundbutton.visible = false;
            if (!ichgplayer)
            {
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'rgba(224, 224, 224, 0.4)';
                ctx.strokeRect(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 200, 200, 200);
            }
            else
            {
                ctx.lineWidth = 5;
                ctx.strokeStyle = 'rgba(255, 255, 204, 0.4)';
                ctx.strokeRect(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 200, 200, 200);
            }
            // информация об игроке
            ctx.font = '25px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
            ctx.fillText("Игрок " + iplayer, ctx.canvas.width / 2, ctx.canvas.height / 2 - 180);
            ctx.fillText('x ', ctx.canvas.width / 2, ctx.canvas.height / 2 - 70);
            ctx.fillText('x ', ctx.canvas.width / 2, ctx.canvas.height / 2 - 130);
            ctx.font = '30px DejaVuSansCondensed';
            ctx.fillStyle = '#fff';
            ctx.fillText(points, ctx.canvas.width / 2 + 45, ctx.canvas.height / 2 - 130);
            ctx.fillText(icoinNumber, ctx.canvas.width / 2 + 45, ctx.canvas.height / 2 - 70);
            //draw stars
            if (stars.length > 0) {
                for (var skey in stars) {
                    if (stars[skey] !== undefined) {
                        ctx.drawImage(stars[skey].image, stars[skey].sprite * stars[skey].w, 0, stars[skey].w, stars[skey].h, ctx.canvas.width / 2 - 55, ctx.canvas.height / 2 - 127, stars[skey].w * 1.3, stars[skey].h * 1.3);
                        stars[skey].sprite++;
                        if (stars[skey].sprite > 10) {
                            stars[skey].sprite = 0;
                        }
                    }
                }
            }
            //draw coins
            if (coins.length > 0) {
                for (var skey in coins) {
                    if (coins[skey] !== undefined) {
                        ctx.drawImage(coins[skey].image, coins[skey].sprite * coins[skey].w, 0, coins[skey].w, coins[skey].h, ctx.canvas.width / 2 - 65, ctx.canvas.height / 2 - 76, coins[skey].w / 2, coins[skey].h / 2);
                        coins[skey].sprite++;
                        if (coins[skey].sprite > 9) {
                            coins[skey].sprite = 0;
                        }
                    }
                }
            }
        }
        else if (iDialogPage === 6) {
            ctx.fillText('Выбор самолета', ctx.canvas.width / 2, ctx.canvas.height / 2 - 300);
            button.visible = false;
            button1.visible = false;
            button2.visible = true;
            button3.visible = true;
            button4.visible = true;
            pausebutton.visible = false;
            button5.visible = false;
            button6.visible = false;
            helpbutton.visible = false;
            playerbutton.visible = false;
            NewGamepbutton.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false;
            Soundbutton.visible = false;
            if (imsg)
            {
                MessageNotEnoughCoins();
                Okbutton.visible = true;
            }
        }
        else if (iDialogPage === 7) {
            button.visible = false;
            helpbutton.visible = false;
            playerbutton.visible = false;
            button1.visible = false;
            button2.visible = true;
            button3.visible = false;
            button4.visible = false;
            button5.visible = false;
            button6.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false;
            Soundbutton.visible = false;
            iplane = 1;
            // clear canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // draw background
            ctx.drawImage(backImage, 0, 0, 700, 700, 0, 0, 700, 700);

            // draw plane
            // tmpImg= new Image();
            // tmpImg.src='images/plan.png';
            // plane.image.src=tmpImg.src;
            ctx.drawImage(plane.image, iSprPos * plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w / 2, plane.y - plane.h / 2, plane.w, plane.h);
            if (chgp !== 2)
            {
                MessageHints();
            }
            NewGamepbutton.visible = true;
        }
        else if (iDialogPage === 8) {
            button.visible = false;
            button1.visible = false;
            button2.visible = true;
            button3.visible = true;
            button4.visible = true;
            pausebutton.visible = false;
            button5.visible = false;
            button6.visible = false;
            playerbutton.visible = false;
            helpbutton.visible = false;
            NewGamepbutton.visible = false;
            Continuepbutton.visible = false;
            Okbutton.visible = false;
            Ok2button.visible = false;
            exitbutton.visible = false; 
            Soundbutton.visible = false;
            Levels();
        }
    }
    else if (!bDrawDialog)
    {
       pausebutton.visible=true;
    }
}

function drawButton() { // функция отрисовки кнопки
    if (button.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button.image, 0, button.imageShift, button.w, button.h, button.x, button.y, button.w, button.h);

        // отрисовка текста на кнопке
        ctx.font = '20px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Новая игра', ctx.canvas.width / 2 - 3, ctx.canvas.height / 2 - 87);
    }
    if (button1.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button1.image, 0, button1.imageShift, button1.w, button1.h, button1.x, button1.y, button1.w, button1.h);

        // отрисовка текста на кнопке
        ctx.font = '20px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Выбор самолета', ctx.canvas.width / 2 - 2, ctx.canvas.height / 2 - 23);
    }
    if (button2.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button2.image, 0, button2.imageShift, button2.w, button2.h, button2.x, button2.y, button2.w, button2.h);

        // отрисовка текста на кнопке
        ctx.font = '20px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Назад в Меню', ctx.canvas.width / 2 - 200, ctx.canvas.height / 2 + 263);
    }
    if (button3.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button3.image, 0, button3.imageShift, button3.w, button3.h, button3.x, button3.y, button3.w, button3.h);

        // отрисовка текста на кнопке
        ctx.font = '20px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Предыдущий', ctx.canvas.width / 2 - 154, ctx.canvas.height / 2 + 52);
    }
    if (button4.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button4.image, 0, button4.imageShift, button4.w, button4.h, button4.x, button4.y, button4.w, button4.h);

        // отрисовка текста на кнопке
        ctx.font = '20px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Следующий', ctx.canvas.width / 2 + 150, ctx.canvas.height / 2 + 52);
    }
    if (pausebutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(pausebutton.image, 0, pausebutton.imageShift, pausebutton.w, pausebutton.h, pausebutton.x, pausebutton.y, pausebutton.w, pausebutton.h);
    }
    if (button5.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button5.image, 0, button5.imageShift, button5.w, button5.h, button5.x, button5.y, button5.w, button5.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Сохранить и выйти', ctx.canvas.width / 2 - 3, ctx.canvas.height / 2 - 20);
    }
    if (button6.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(button6.image, 0, button6.imageShift, button6.w, button6.h, button6.x, button6.y, button6.w, button6.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Выйти без сохранения', ctx.canvas.width / 2 - 2, ctx.canvas.height / 2 + 43);
    }
    if (Soundbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(Soundbutton.image, 0, Soundbutton.imageShift, Soundbutton.w, Soundbutton.h, Soundbutton.x, Soundbutton.y, Soundbutton.w, Soundbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Вкл/Выкл звук', ctx.canvas.width / 2 - 2, ctx.canvas.height / 2 + 108);
    }
    if (helpbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(helpbutton.image, 0, helpbutton.imageShift, helpbutton.w, helpbutton.h, helpbutton.x, helpbutton.y, helpbutton.w, helpbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Справка', ctx.canvas.width / 2 - 3, ctx.canvas.height / 2 + 39);
    }
    if (Continuepbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(Continuepbutton.image, 0, Continuepbutton.imageShift, Continuepbutton.w, Continuepbutton.h, Continuepbutton.x, Continuepbutton.y, Continuepbutton.w, Continuepbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Продолжить', ctx.canvas.width / 2 - 3, ctx.canvas.height / 2 - 151);
    }
    if (NewGamepbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(NewGamepbutton.image, 0, NewGamepbutton.imageShift, NewGamepbutton.w, NewGamepbutton.h, NewGamepbutton.x, NewGamepbutton.y, NewGamepbutton.w, NewGamepbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Играть', ctx.canvas.width / 2 - 3, ctx.canvas.height / 2 + 137);
    }
    if (playerbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(playerbutton.image, 0, playerbutton.imageShift, playerbutton.w, playerbutton.h, playerbutton.x, playerbutton.y, playerbutton.w, playerbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Смена игрока', ctx.canvas.width / 2 - 3, ctx.canvas.height / 2 + 99);
    }
    if (Okbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(Okbutton.image, 0, Okbutton.imageShift, Okbutton.w, Okbutton.h, Okbutton.x, Okbutton.y, Okbutton.w, Okbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('OK', ctx.canvas.width / 2 - 2, ctx.canvas.height / 2 - 40);
    }
    if (Ok2button.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(Ok2button.image, 0, Ok2button.imageShift, Ok2button.w, Ok2button.h, Ok2button.x, Ok2button.y, Ok2button.w, Ok2button.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('OK', ctx.canvas.width / 2 - 2, ctx.canvas.height / 2 + 139);
    }
    if (exitbutton.visible == true)
    {
        // отрисовка кнопки
        ctx.drawImage(exitbutton.image, 0, exitbutton.imageShift, exitbutton.w, exitbutton.h, exitbutton.x, exitbutton.y, exitbutton.w, exitbutton.h);

        // отрисовка текста на кнопке
        ctx.font = '19px DejaVuSansCondensed';
        ctx.fillStyle = '#F4F3FC';
        ctx.fillText('Выход', ctx.canvas.width / 2 - 2, ctx.canvas.height / 2 + 159);
    }
}
                
// функции рисования:
function drawScene() { // основная функция отрисовки сцены  
// отрисовка диалога
    drawDialog();
    drawButton();
    if (!bDrawDialog)
    {
        if (!bPause) {
            iBgShiftY -= 2; // move main ground
             /* bDrawDialog = true;
             iDialogPage = 4;*/
             /* bDrawDialog = true;
             iDialogPage = 8;*/
            if (iBgShiftY < 5) { // Finish position
                bPause = true;
                bDrawDialog = true;
                iDialogPage = 4;
                isEnd = true;
                levelEnd = true;
            }

            // process pressed keys (movement of plane)
            processPressedKeys();

            // clear canvas
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // draw background
            if (Numchglevel == 1)
            {
               ctx.drawImage(backgroundImage, 0, 0 + iBgShiftY, 700, 700, 0, 0, 700, 700);
            }
            else if (Numchglevel == 2)
            {
                ctx.drawImage(backgroundImage1, 0, 0 + iBgShiftY, 700, 700, 0, 0, 700, 700);
            }

            // draw plane
             if (chgp == 1)
             {
             ctx.drawImage(plane.image, iSprPos*plane.w + 15, 0, plane.w+10, plane.h, plane.x - plane.w/2, plane.y - plane.h/2, plane.w, plane.h);
             }
             else if (chgp == 2)
             {
                ctx.drawImage(plane.image, iSprPos*plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w/2, plane.y - plane.h/2, plane.w, plane.h);
             }
        
        // draw pause
        ctx.drawImage(pausebutton.image, 0, pausebutton.imageShift, pausebutton.w, pausebutton.h, pausebutton.x, pausebutton.y, pausebutton.w, pausebutton.h);
  
        // draw clouds
        if (clouds.length > 0) {
            for (var ekey in clouds) {
                if (clouds[ekey] != undefined) {
                    ctx.drawImage(clouds[ekey].image, clouds[ekey].x, clouds[ekey].y);
                    clouds[ekey].y -= clouds[ekey].speed;

                    // remove an cloud object if it is out of screen
                    if (clouds[ekey].y > canvas.height) {
                        delete clouds[ekey];
                    }
                }
            }
        }
        // draw rockets
        if (rockets.length > 0) {
            for (var key in rockets) {
                if (rockets[key] != undefined) {
                    ctx.drawImage(rockets[key].image, rockets[key].x, rockets[key].y);
                    rockets[key].y -= rockets[key].speed;

                    // if a rocket is out of screen - remove it
                    if (rockets[key].y < 0) {
                        delete rockets[key];
                    }
                }
            }
        }
        
        // draw enemies
        if (enemies.length > 0) {
            for (var ekey in enemies) {
                if (enemies[ekey] != undefined) {
                    ctx.drawImage(enemies[ekey].image, enemies[ekey].x, enemies[ekey].y);
                    enemies[ekey].y -= enemies[ekey].speed;

                    // remove an enemy object if it is out of screen
                    if (enemies[ekey].y > canvas.height) {
                        delete enemies[ekey];
                    }
                }
            }
        }
        
       // draw explosions
       if (explosions.length > 0) {
          for (var key in explosions) {
             if (explosions[key] != undefined) {
             // display explosion sprites
             ctx.drawImage(explosions[key].image, explosions[key].sprite*explosions[key].w, 0, explosions[key].w, explosions[key].h, explosions[key].x - explosions[key].w/2, explosions[key].y - explosions[key].h/2, explosions[key].w, explosions[key].h);
             explosions[key].sprite++;
             
                // remove an explosion object when it expires
                if (explosions[key].sprite > 5) {
                delete explosions[key];
                }
            }
          }
       }    
       
        // draw badoblako
        if (badoblako.length > 0) {
            for (var okey in badoblako) {
                if (badoblako[okey] != undefined) {
                    ctx.drawImage(badoblako[okey].image, badoblako[okey].sprite*badoblako[okey].w, 0, badoblako[okey].w, badoblako[okey].h, badoblako[okey].x - badoblako[okey].w/2, badoblako[okey].y - badoblako[okey].h/2, badoblako[okey].w, badoblako[okey].h);
                    var rand = Math.random()*100;
                    if( 20 >= rand <= 50)
                    badoblako[okey].sprite++;          
                    badoblako[okey].y -= badoblako[okey].speed;

                    if (badoblako[okey].sprite > 5) {
                    badoblako[okey].sprite = 0;
                    }
                    // remove an enemy object if it is out of screen
                    if (badoblako[okey].y > canvas.height) {
                        delete badoblako[okey];


                    }
                    //console.log(badoblako[okey].sprite)
                }
            }
        }
        //draw stars
         if (stars.length > 0) {
            for (var skey in stars) {
                if (stars[skey] != undefined) {
                    ctx.drawImage(stars[skey].image, stars[skey].sprite*stars[skey].w, 0, stars[skey].w, stars[skey].h, stars[skey].x - stars[skey].w/2, stars[skey].y - stars[skey].h/2, stars[skey].w, stars[skey].h);
                    stars[skey].sprite++;          
                    stars[skey].y -= stars[skey].speed;

                    if (stars[skey].sprite > 10) {
                        stars[skey].sprite = 0;
                    }
                    // remove an enemy object if it is out of screen
                    if (stars[skey].y > canvas.height) {
                        delete stars[skey];
                    }
                    //console.log(stars[skey].x)
                }
            }
        }

        // draw clouds
        if (clouds.length > 0) {
            for (var ekey in clouds) {
                if (clouds[ekey] != undefined) {
                    ctx.drawImage(clouds[ekey].image, clouds[ekey].x, clouds[ekey].y);
                    clouds[ekey].y -= clouds[ekey].speed;

                    // remove an cloud object if it is out of screen
                    if (clouds[ekey].y > canvas.height) {
                        delete clouds[ekey];
                    }
                }
            }
        }
        // draw bottles
            if (bottle.length > 0 ) {
            for(var bkey in bottle) {
                if (bottle[bkey] != undefined) {
                    ctx.drawImage(bottle[bkey].image, bottle[bkey].x, bottle[bkey].y);
                    bottle[bkey].y -= bottle[bkey].speed;

                    if (bottle[bkey].y > canvas.height) {
                        delete bottle[bkey];
                    }
                }
            } 
    }
            //collision with enemies
            if (enemies.length > 0) {
            for (var ekey in enemies) {
                if (enemies[ekey] != undefined) {

                    // collisions with rockets
                    if (rockets.length > 0) {
                        for (var key in rockets) {
                            if (rockets[key] != undefined) {
                                if (rockets[key].y < enemies[ekey].y + enemies[ekey].h/2 && rockets[key].x > enemies[ekey].x && rockets[key].x + rockets[key].w < enemies[ekey].x + enemies[ekey].w) {
                                    explosions.push(new Explosion(enemies[ekey].x + enemies[ekey].w / 2, enemies[ekey].y + enemies[ekey].h / 2, 118, 118, 0, oExplosionImage));

                                    // delete enemy, rocket, and add +1 to score
                                    delete enemies[ekey];
                                    delete rockets[key];
                                    iScore++;
                                    if(PlaySound)
                                     {
                                        oblako_Sound = new Audio('media/explosion.wav');
                                        oblako_Sound.volume = 0.9;
                                        oblako_Sound.play();
                                     }
                                }
                            }
                        }
                    }

                    // collisions with plane
                    if (enemies[ekey] != undefined) {
                        if (plane.y - plane.h/2 < enemies[ekey].y + enemies[ekey].h/2 && plane.x - plane.w/2 < enemies[ekey].x + enemies[ekey].w && plane.x + plane.w/2 > enemies[ekey].x) {
                            explosions.push(new Explosion(enemies[ekey].x + enemies[ekey].w / 2, enemies[ekey].y + enemies[ekey].h / 2, 118, 118, 0, oExplosionImage));

                            // delete enemy and make damage
                            delete enemies[ekey];
                            iLife -= iDamage;
                            if(PlaySound)
                            {
                                oblako_Sound = new Audio('media/explosion.wav');
                                oblako_Sound.volume = 0.9;
                                oblako_Sound.play();
                            }

                            if (iLife <= 0) { // Game over
                                bPause = true;
                                bDrawDialog = true;
                                isEnd = true;
                                flag = 0;
                                iLife = 0;
                                iScore = 0;
                                iDialogPage = 4;  
                               // return;
                            }
                        }
                    }
                }
            }
        }
        //collision with badoblako
        if (badoblako.length > 0) {
            for (var ekey in badoblako) {
                if (badoblako[ekey] != undefined) {

                    // collisions with plane
                        
                        if (plane.y < badoblako[ekey].y + badoblako[ekey].h &&  plane.x > badoblako[ekey].x - badoblako[ekey].h/2 && plane.x < badoblako[ekey].x + badoblako[ekey].h/2) {
                            //console.log(badoblako[ekey].x);
                            
                            explosions.push(new Explosion(badoblako[ekey].x + badoblako[ekey].w / 2, badoblako[ekey].y + badoblako[ekey].h / 2, 118, 118, 0, oExplosionImage));

                            // delete badoblako and make damage
                            delete badoblako[ekey];
                            iLife -= iDamage;
                            if(PlaySound)
                            {
                                oblako_Sound = new Audio('media/explosion.wav');
                                oblako_Sound.volume = 0.9;
                                oblako_Sound.play();
                            }
                        
                            if (iLife <= 0) { // Game over
                                bPause = true;
                                bDrawDialog = true;
                                isEnd = true;
                                flag = 0;
                                iLife = 0;
                                iScore = 0;
                                iDialogPage = 4;  
                               // return;
                            }
                        }
                  //  }
                }
            }
		}
                
    if (bottle.length > 0 ) {
      for(var bkey in bottle) {
        if (bottle[bkey] != undefined) {
          // collisions with plane
          if (plane.y < bottle[bkey].y + bottle[bkey].h &&  plane.x > bottle[bkey].x - bottle[bkey].h && plane.x < bottle[bkey].x + bottle[bkey].h) {
                            
            delete bottle[bkey];
            iLife += 20;
          }
        }
      }
    }
		if (stars.length > 0){
			for (var ekey in stars) {
	          if (stars[ekey] != undefined) {
                    // collisions with plane
                    if (stars[ekey] != undefined) {
                        if (plane.y - plane.h/2 < stars[ekey].y + stars[ekey].h/2 && plane.x - plane.w/2 < stars[ekey].x + stars[ekey].w && plane.x + plane.w/2 > stars[ekey].x) {
                            //explosions.push(new Explosion(stars[ekey].x + stars[ekey].w / 2, stars[ekey].y + stars[ekey].h / 2, 120, 120, 0, oExplosionImage));

                            // delete enemy and make damage
                            delete stars[ekey];
                            iScore++;
                            if(PlaySound)
                            {
                                wingsSound = new Audio('media/count3.wav');
                                wingsSound.volume = 0.9;
                                wingsSound.play();
                            }
                            

                        }
                    }

                }
			}
			
        }
                
            
        
        // display life and score
        ctx.font = '14px DejaVuSansCondensed';
        ctx.fillStyle = '#FFF6EC';
        ctx.fillText('Топливо: ' + iLife + ' / 100', 75, 660);
        ctx.fillText('          Очки: ' + iScore * 10, 40, 680);
    }       
    }
}

// -------------------------------------------------------------

// Process Pressed Keys function
function processPressedKeys() {
    if (pressedKeys[37] != undefined) { // 'Left' key
        if (iSprPos > 0) {
            iSprPos = 2;
            iMoveDir = -5;//скорость поворота самолета
        }
        if (plane.x - plane.w / 2 > 10) {
            plane.x += iMoveDir;
        }
    }
    else if (pressedKeys[39] != undefined) { // 'Right' key
        if (iSprPos < 2) {
            iSprPos = 0;
            iMoveDir = 5;
        }
        if (plane.x + plane.w / 2 < canvas.width - 10) {
            plane.x += iMoveDir;
        }
    }
}

// инициализация
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    canvas.width = window.screen.width ;
    canvas.height = window.screen.height;

    backgroundImage = new Image();
    backgroundImage.src = 'images/fon.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }
    
    backgroundImage1 = new Image();
    backgroundImage1.src = 'images/levelmap1.png';
    backgroundImage1.onload = function() {
    }
    backgroundImage1.onerror = function() {
        console.log('Error loading the background image.');
    }
    
    backImage = new Image();
    backImage.src = 'images/Fighter.jpg';
    backImage.onload = function() {
    }

    // initialization of explosion image
    oExplosionImage = new Image();
   // oExplosionImage.src = 'images/explosion.png';
    oExplosionImage.src = 'images/Explosion-Sprite-Sheet.png';
    oExplosionImage.onload = function() { }

    // initialization of empty cloud
    oCloudImage = new Image();
    oCloudImage.src = 'images/cloud1.png';
    oCloudImage.onload = function() { }
    
    // initialization of badoblako
    oBadoblakoImage = new Image();
    oBadoblakoImage.src = 'images/oblako_2.png';
    oBadoblakoImage.onload = function() { }

    oBottleImage = new Image();
    oBottleImage.src = 'images/bottle.png';
    oBottleImage.onload = function() {}

    //initialization of stars
    oStarsImage = new Image();
    oStarsImage.src = 'images/zvezda.png';
    oStarsImage.onload = function() { }
    
    //initialization of coins 
    oCoinsImage = new Image();
    oCoinsImage.src = 'images/coin.png';
    oCoinsImage.onload = function() { }
    
    // initialization of empty rocket
    oRocketImage = new Image();
  //  oRocketImage.src = 'images/rocket.png';
    oRocketImage.src = 'images/B2.png';
    oRocketImage.onload = function() { }
    
    // initialization of empty enemy
    oEnemyImage = new Image();
    oEnemyImage.src = 'images/Bomber39_1.png';
    oEnemyImage.onload = function() { }

    // initialization of plane1
    var oPlaneImage = new Image();
    oPlaneImage.src = 'images/plan.png';
    oPlaneImage.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlaneImage);
    }
    // initialization of plane2
    var oPlane2Image = new Image();
        oPlane2Image.src = 'images/plan2.png';
        oPlane2Image.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlane2Image);
    }

    // загрузка кнопки меню
    var buttonImage = new Image();
    buttonImage.src = 'images/menu.png';
    buttonImage.onload = function() {
    }
    // загрузка кнопки паузы
    var pauseImage = new Image();
    pauseImage.src = 'images/pause-button1.png';
    pauseImage.onload = function() {
    }
    button = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 100, 202, 52, 'normal', buttonImage);//кнопка Новая игра
    button1 = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 35, 202, 52, 'normal', buttonImage); //кнопка Выбор самолета
    button2 = new Button(ctx.canvas.width / 2 - 300, ctx.canvas.height / 2 + 250, 202, 52, 'normal', buttonImage); //кнопка возврат в Меню из диалога Выбора самолета
    button3 = new Button(ctx.canvas.width / 2 - 250, ctx.canvas.height / 2 + 40, 202, 52, 'normal', buttonImage); //кнопка Предыдущий самолет
    button4 = new Button(ctx.canvas.width / 2 + 50, ctx.canvas.height / 2 + 40, 202, 52, 'normal', buttonImage); //кнопка Следующий самолет
    pausebutton = new Button(ctx.canvas.width / 2 - 345, ctx.canvas.height / 2 - 345, 38, 38, 'normal', pauseImage); //кнопка паузы
    button5 = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 35, 202, 52, 'normal', buttonImage); //кнопка Сохранить и выйти
    button6 = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 30, 202, 52, 'normal', buttonImage); //кнопка Выйти без сохранения
    helpbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 25, 202, 52, 'normal', buttonImage); //кнопка Справка
    Continuepbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 165, 202, 52, 'normal', buttonImage); //кнопка Продолжить
    NewGamepbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 125, 202, 52, 'normal', buttonImage); //кнопка Новая игра после подсказки
    playerbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 85, 202, 52, 'normal', buttonImage); //кнопка Смена игрока
    Okbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 - 55, 202, 52, 'normal', buttonImage); //кнопка Ok
    exitbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 145, 202, 52, 'normal', buttonImage); //кнопка Выход
    Ok2button = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 125, 202, 52, 'normal', buttonImage); //кнопка Ok2
    Soundbutton = new Button(ctx.canvas.width / 2 - 100, ctx.canvas.height / 2 + 95, 202, 52, 'normal', buttonImage); //кнопка Sound
    
    $(window).keydown(function (evt){ // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (! pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }
    });

    $(window).keyup(function (evt) { // onkeyup event handle
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode]; // remove pressed key from array
        }
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            // revert plane sprite to default position
            if (iSprPos > 1) {
                for (var i = iSprPos; i >= 1; i--) {
                    iSprPos = i;
                    iMoveDir = 0;
                }
            } else {
                for (var i = iSprPos; i <= 1; i++) {
                    iSprPos = i;
                    iMoveDir = 0;
                }
            }
        }
    });
	var intervalUp;
    $('#scene').mousedown(function(e) { // привязываем событие нажатия мыши (для перетаскивания)

        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        
        if(!bDrawDialog)
        {
	if(e.originalEvent.layerX) { 
            mouseX = e.originalEvent.layerX; 
        }

        if (mouseX > plane.x ) {
            // bMouseDown = true;
            // plane.bDrag = true;
            intervalUp = setInterval(function() {               
                if (mouseX > plane.x) {
                    // if (iSprPos > 0) {
                        iSprPos = 0;
                    // }
                    plane.x=plane.x+10;    
                }
            },40);
        } else if(mouseX < plane.x){
            // bMouseDown = true;
            // plane.bDrag = true;
            intervalUp = setInterval(function() {
                if(plane.x > mouseX) {
                    // if (iSprPos  > 0) {
                        iSprPos = 2;
                    // }
                    plane.x=plane.x-10;
                }
            },40);
        }
        }	
		
        if (iDialogPage == 2)
        {
            if (mouseX > ctx.canvas.width / 2 - 100 && mouseX < ctx.canvas.width / 2 - 100 + 200 && mouseY > ctx.canvas.height / 2 - 200 && mouseY < ctx.canvas.height / 2 - 200 + 200) {
                if (iplane == 2)
                {
                  if (chgp !== 2)
                  {
                    if (icoinNumber >= 3)
                    {
                        icoinNumber = icoinNumber - 3;
                        bplane = true;
                        imsg = false;
                        iDialogPage = 2;
                        chgp = 2;
                    }
                    else
                    {
                        iplane = 1;
                        imsg = true;
                        iDialogPage = 6;
                    }
                  }
                  else
                  {
                        bplane = true;
                        imsg = false;
                        iDialogPage = 2;
                        chgp = 2;
                  }
                }
                else if (iplane == 1)
                {
                    bplane = true;
                    imsg = false;
                    iDialogPage = 2;
                }
            }
            else
            {
                bplane = false;
                imsg = false;
                iDialogPage = 2;
            }
        }
        if (iDialogPage == 5)
        {
            if (mouseX > ctx.canvas.width / 2 - 100 && mouseX < ctx.canvas.width / 2 - 100 + 200 && mouseY > ctx.canvas.height / 2 - 200 && mouseY < ctx.canvas.height / 2 - 200 + 200) {
                ichgplayer = true;
                Numchgplayer = iplayer;
            }
            else
            {
                ichgplayer = false;
            }
        }
        if (iDialogPage == 8)
         {
            if (mouseX > ctx.canvas.width / 2 - 100 && mouseX < ctx.canvas.width / 2 - 100 + 200 && mouseY > ctx.canvas.height / 2 - 200 && mouseY < ctx.canvas.height / 2 - 200 + 200) {
                if (ilevel == 2)
                {
                    if (Numchglevel !== 2)
                    {
                         if (icoinNumber >= 3)
                         {
                            icoinNumber = icoinNumber - 3;
                            iDialogPage = 0;
                            bDrawDialog = false;
                            bPause = false;
                            pauseclick = 0;
                            chglevel = true;
                            Levelmsg = false;
                            Numchglevel = 2;
                         }
                         else
                        {
                           ilevel = 1;
                           Levelmsg = true;
                           DialogPage = 8;
                        }
                    }
                    else
                    {
                            iDialogPage = 0;
                            bDrawDialog = false;
                            bPause = false;
                            pauseclick = 0;
                            chglevel = true;
                            Levelmsg = false;
                            Numchglevel = 2;
                    }
                }
                else if (ilevel == 1)
                {
                    chglevel = true;
                    iDialogPage = 8;
                    Levelmsg = false;
                }
            }
        }

        // поведение кнопок
        if (button.visible)
        {
            if (mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h) {
                button.state = 'pressed';
                button.imageShift = 112;
            }
        }
        if (button1.visible)
        {
            if (mouseX > button1.x && mouseX < button1.x + button1.w && mouseY > button1.y && mouseY < button1.y + button1.h) {
                button1.state = 'pressed';
                button1.imageShift = 112;
            }
        }
        if (button2.visible)
        {
            if (mouseX > button2.x && mouseX < button2.x + button2.w && mouseY > button2.y && mouseY < button2.y + button2.h) {
                button2.state = 'pressed';
                button2.imageShift = 112;
            }
        }
        if (button3.visible)
        {
            if (mouseX > button3.x && mouseX < button3.x + button3.w && mouseY > button3.y && mouseY < button3.y + button3.h) {
                button3.state = 'pressed';
                button3.imageShift = 112;
            }
        }
        if (button4.visible)
        {
            if (mouseX > button4.x && mouseX < button4.x + button4.w && mouseY > button4.y && mouseY < button4.y + button4.h) {
                button4.state = 'pressed';
                button4.imageShift = 112;
            }
        }
        if (pausebutton.visible)
        {
            if (mouseX > pausebutton.x && mouseX < pausebutton.x + pausebutton.w && mouseY > pausebutton.y && mouseY < pausebutton.y + pausebutton.h) {
                pausebutton.state = 'pressed';
                pausebutton.imageShift = 0;
            }
        }
        if (button5.visible)
        {
            if (mouseX > button5.x && mouseX < button5.x + button5.w && mouseY > button5.y && mouseY < button5.y + button5.h) {
                button5.state = 'pressed';
                button5.imageShift = 112;
            }
        }
        if (button6.visible)
        {
            if (mouseX > button6.x && mouseX < button6.x + button6.w && mouseY > button6.y && mouseY < button6.y + button6.h) {
                button6.state = 'pressed';
                button6.imageShift = 112;
            }
        }
        if (helpbutton.visible)
        {
            if (mouseX > helpbutton.x && mouseX < helpbutton.x + helpbutton.w && mouseY > helpbutton.y && mouseY < helpbutton.y + helpbutton.h) {
                helpbutton.state = 'pressed';
                helpbutton.imageShift = 112;
            }
        }
        if (Continuepbutton.visible)
        {
            if (mouseX > Continuepbutton.x && mouseX < Continuepbutton.x + Continuepbutton.w && mouseY > Continuepbutton.y && mouseY < Continuepbutton.y + Continuepbutton.h) {
                Continuepbutton.state = 'pressed';
                Continuepbutton.imageShift = 112;
            }
        }
        if (NewGamepbutton.visible)
        {
            if (mouseX > NewGamepbutton.x && mouseX < NewGamepbutton.x + NewGamepbutton.w && mouseY > NewGamepbutton.y && mouseY < NewGamepbutton.y + NewGamepbutton.h) {
                NewGamepbutton.state = 'pressed';
                NewGamepbutton.imageShift = 112;
            }
        }
        if (playerbutton.visible)
        {
            if (mouseX > playerbutton.x && mouseX < playerbutton.x + playerbutton.w && mouseY > playerbutton.y && mouseY < playerbutton.y + playerbutton.h) {
                playerbutton.state = 'pressed';
                playerbutton.imageShift = 112;
            }
        }
        if (Okbutton.visible)
        {
            if (mouseX > Okbutton.x && mouseX < Okbutton.x + Okbutton.w && mouseY > Okbutton.y && mouseY < Okbutton.y + Okbutton.h) {
                Okbutton.state = 'pressed';
                Okbutton.imageShift = 112;
            }
        }
        if (Ok2button.visible)
        {
            if (mouseX > Ok2button.x && mouseX < Ok2button.x + Ok2button.w && mouseY > Ok2button.y && mouseY < Ok2button.y + Ok2button.h) {
                Ok2button.state = 'pressed';
                Ok2button.imageShift = 112;
            }
        }
        if (exitbutton.visible)
        {
            if (mouseX > exitbutton.x && mouseX < exitbutton.x + exitbutton.w && mouseY > exitbutton.y && mouseY < exitbutton.y + exitbutton.h) {
                exitbutton.state = 'pressed';
                exitbutton.imageShift = 112;
            }
        }
        if (Soundbutton.visible)
        {
            if (mouseX > Soundbutton.x && mouseX < Soundbutton.x + Soundbutton.w && mouseY > Soundbutton.y && mouseY < Soundbutton.y + Soundbutton.h) {
                Soundbutton.state = 'pressed';
                Soundbutton.imageShift = 112;
            }
        }
    });

    $('#scene').mousemove(function(e) { // привязываем событие движения мыши
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;

        // поведение кнопок
        if (button.visible)
        {
            if (button.state != 'pressed') {
                button.state = 'normal';
                button.imageShift = 0;
                if (mouseX > button.x && mouseX < button.x + button.w && mouseY > button.y && mouseY < button.y + button.h) {
                    button.state = 'hover';
                    button.imageShift = 54;
                }
            }
        }
        if (button1.visible)
        {
            if (button1.state != 'pressed') {
                button1.state = 'normal';
                button1.imageShift = 0;
                if (mouseX > button1.x && mouseX < button1.x + button1.w && mouseY > button1.y && mouseY < button1.y + button1.h) {
                    button1.state = 'hover';
                    button1.imageShift = 54;
                }
            }
        }
        if (button2.visible)
        {
            if (button2.state != 'pressed') {
                button2.state = 'normal';
                button2.imageShift = 0;
                if (mouseX > button2.x && mouseX < button2.x + button2.w && mouseY > button2.y && mouseY < button2.y + button2.h) {
                    button2.state = 'hover';
                    button2.imageShift = 54;
                }
            }
        }
        if (button3.visible)
        {
            if (button3.state != 'pressed') {
                button3.state = 'normal';
                button3.imageShift = 0;
                if (mouseX > button3.x && mouseX < button3.x + button3.w && mouseY > button3.y && mouseY < button3.y + button3.h) {
                    button3.state = 'hover';
                    button3.imageShift = 54;
                }
            }
        }
        if (button4.visible)
        {
            if (button4.state != 'pressed') {
                button4.state = 'normal';
                button4.imageShift = 0;
                if (mouseX > button4.x && mouseX < button4.x + button4.w && mouseY > button4.y && mouseY < button4.y + button4.h) {
                    button4.state = 'hover';
                    button4.imageShift = 54;
                }
            }
        }
        if (pausebutton.visible)
        {
            if (pausebutton.state != 'pressed') {
                pausebutton.state = 'normal';
                pausebutton.imageShift = 0;
                if (mouseX > pausebutton.x && mouseX < pausebutton.x + pausebutton.w && mouseY > pausebutton.y && mouseY < pausebutton.y + pausebutton.h) {
                    pausebutton.state = 'hover';
                    pausebutton.imageShift = 0;
                }
            }
        }
        if (button5.visible)
        {
            if (button5.state != 'pressed') {
                button5.state = 'normal';
                button5.imageShift = 0;
                if (mouseX > button5.x && mouseX < button5.x + button5.w && mouseY > button5.y && mouseY < button5.y + button5.h) {
                    button5.state = 'hover';
                    button5.imageShift = 54;
                }
            }
        }
        if (button6.visible)
        {
            if (button6.state != 'pressed') {
                button6.state = 'normal';
                button6.imageShift = 0;
                if (mouseX > button6.x && mouseX < button6.x + button6.w && mouseY > button6.y && mouseY < button6.y + button6.h) {
                    button6.state = 'hover';
                    button6.imageShift = 54;
                }
            }
        }
        if (helpbutton.visible)
        {
            if (helpbutton.state != 'pressed') {
                helpbutton.state = 'normal';
                helpbutton.imageShift = 0;
                if (mouseX > helpbutton.x && mouseX < helpbutton.x + helpbutton.w && mouseY > helpbutton.y && mouseY < helpbutton.y + helpbutton.h) {
                    helpbutton.state = 'hover';
                    helpbutton.imageShift = 54;
                }
            }
        }
        if (Continuepbutton.visible)
        {
            if (Continuepbutton.state != 'pressed') {
                Continuepbutton.state = 'normal';
                Continuepbutton.imageShift = 0;
                if (mouseX > Continuepbutton.x && mouseX < Continuepbutton.x + Continuepbutton.w && mouseY > Continuepbutton.y && mouseY < Continuepbutton.y + Continuepbutton.h) {
                    Continuepbutton.state = 'hover';
                    Continuepbutton.imageShift = 54;
                }
            }
        }
        if (NewGamepbutton.visible)
        {
            if (NewGamepbutton.state != 'pressed') {
                NewGamepbutton.state = 'normal';
                NewGamepbutton.imageShift = 0;
                if (mouseX > NewGamepbutton.x && mouseX < NewGamepbutton.x + NewGamepbutton.w && mouseY > NewGamepbutton.y && mouseY < NewGamepbutton.y + NewGamepbutton.h) {
                    NewGamepbutton.state = 'hover';
                    NewGamepbutton.imageShift = 54;
                }
            }
        }
        if (playerbutton.visible)
        {
            if (playerbutton.state != 'pressed') {
                playerbutton.state = 'normal';
                playerbutton.imageShift = 0;
                if (mouseX > playerbutton.x && mouseX < playerbutton.x + playerbutton.w && mouseY > playerbutton.y && mouseY < playerbutton.y + playerbutton.h) {
                    playerbutton.state = 'hover';
                    playerbutton.imageShift = 54;
                }
            }
        }
        if (Okbutton.visible)
        {
            if (Okbutton.state != 'pressed') {
                Okbutton.state = 'normal';
                Okbutton.imageShift = 0;
                if (mouseX > Okbutton.x && mouseX < Okbutton.x + Okbutton.w && mouseY > Okbutton.y && mouseY < Okbutton.y + Okbutton.h) {
                    Okbutton.state = 'hover';
                    Okbutton.imageShift = 54;
                }
            }
        }
        if (Ok2button.visible)
        {
            if (Ok2button.state != 'pressed') {
                Ok2button.state = 'normal';
                Ok2button.imageShift = 0;
                if (mouseX > Ok2button.x && mouseX < Ok2button.x + Ok2button.w && mouseY > Ok2button.y && mouseY < Ok2button.y + Ok2button.h) {
                    Ok2button.state = 'hover';
                    Ok2button.imageShift = 54;
                }
            }
        }
        if (exitbutton.visible)
        {
            if (exitbutton.state != 'pressed') {
                exitbutton.state = 'normal';
                exitbutton.imageShift = 0;
                if (mouseX > exitbutton.x && mouseX < exitbutton.x + exitbutton.w && mouseY > exitbutton.y && mouseY < exitbutton.y + exitbutton.h) {
                    exitbutton.state = 'hover';
                    exitbutton.imageShift = 54;
                }
            }
        }
        if (Soundbutton.visible)
        {
            if (Soundbutton.state != 'pressed') {
                Soundbutton.state = 'normal';
                Soundbutton.imageShift = 0;
                if (mouseX > Soundbutton.x && mouseX < Soundbutton.x + Soundbutton.w && mouseY > Soundbutton.y && mouseY < Soundbutton.y + Soundbutton.h) {
                    Soundbutton.state = 'hover';
                    Soundbutton.imageShift = 54;
                }
            }
        }
    });

    $('#scene').mouseup(function(e) { // привязываем событие отжатия кнопки
	iSprPos = 1;
        clearInterval(intervalUp);
        // поведение кнопок
        //кнопка Новая игра
        if(button.visible)
        {
            if (button.state === 'pressed') {
                tmpImg = new Image();
                if (chgp != 2)
                {
                    tmpImg.src = 'images/plan.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                else
                {
                    tmpImg.src = 'images/plan2.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                if (!isSave)
                {
                    iDialogPage = 7;
                    iplane = 1;
                }
                else
                {
                    Generate();
                    NoSave();
                    iDialogPage = 0;
                    bDrawDialog = false;
                    bPause = false;
                }
            }
                
        }
        button.state = 'normal';
        button.imageShift = 0;
        //кнопка Играть
        if (NewGamepbutton.visible)
        {
            if (NewGamepbutton.state === 'pressed') {
                iplane = 1;
                Generate();
                NoSave();
                iDialogPage = 0;
                bDrawDialog = false;
                bPause = false;
                pauseclick = 0;
                       /*iDialogPage = 8; //для проверки
                        Changelevel = true;*/
            }
        }
        NewGamepbutton.state = 'normal';
        NewGamepbutton.imageShift = 0;
        //кнопка Продолжить
        if(Continuepbutton.visible)
        {
            if (Continuepbutton.state === 'pressed') {
                if(levelEnd)
                {
                  iDialogPage = 8;
                  Changelevel = true;
                }
                   if(!isEnd)
                   {
                   
                    //!!!

                    iDialogPage = 0;
                    bDrawDialog = false;
                    bPause = false;
                    pauseclick = 0;
                   }
               /* else if (isEnd)
                {
                                   //load 
                var load={};
                load=JSON.parse(localStorage.getItem(Numchgplayer));
                   // alert(JSON.stringify(load));
                        //
                   points=load.points;
                   icoinNumber=load.coins;

                   plane.x = load.plane.x;
                   plane.y = load.plane.y;
                   iLife=load.life;
                   if (load.clouds.length > 0) {
                           for (var ekey in load.clouds) {
                                   if (load.clouds[ekey] !== undefined) {
                                           //clouds[ekey]={};
                                           clouds[ekey].x = load.clouds[ekey].x;
                                           clouds[ekey].y = load.clouds[ekey].y;
                                   }
                           }
                   }
                  if (load.badoblako.length > 0) {
                           for (var okey in load.badoblako) {
                                   if (load.badoblako[okey] !== undefined) {
                                           badoblako[okey].x = load.badoblako[okey].x;
                                           badoblako[okey].y = load.badoblako[okey].y;
                                   }
                           }
                   }
                   if (load.stars.length > 0) {
                           for (var skey in load.stars) {
                                   if (load.stars[skey] !== undefined) {
                                           stars[skey].x = load.stars[skey].x;
                                           stars[skey].y = load.stars[skey].y;
                                  }
                           }
                   }

                   if (load.bottle.length > 0) {
                           for (var bkey in load.bottle) {
                                   if (load.bottle[bkey] !== undefined) {
                                           bottle[bkey].x = load.bottle[bkey].x;
                                           bottle[bkey].y = load.bottle[bkey].y;
                                  }
                           }
                   }*/
            }
        }
        Continuepbutton.state = 'normal';
        Continuepbutton.imageShift = 0;
        //кнопка Выбор самолета
        if(button1.visible)
        {
            if (button1.state === 'pressed') {
                iplane = 1;
                iDialogPage = 2;
                changePlane = true;
               // Changelevel = false;
            }
        }
        button1.state = 'normal';
        button1.imageShift = 0;
        //кнопка возврат в Меню из диалога Выбора самолета
        if(button2.visible)
        {
            if (button2.state === 'pressed') {
              iDialogPage = 1;
              changePlane = false;
              Changeplayer = false;
              tmpImg = new Image();
                if (chgp != 2)
                {
                    tmpImg.src = 'images/plan.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                else
                {
                    tmpImg.src = 'images/plan2.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
              button.visible=true;
              helpbutton.visible=true;
              button1.visible=true;
              button2.visible=false;
              button3.visible=false;
              button4.visible=false;
              NewGamepbutton.visible=false;
              Continuepbutton.visible=false;
            }

        }
        button2.state = 'normal';
        button2.imageShift = 0;
        //кнопка Предыдущий самолет
        if(button3.visible)
        {
            if (button3.state === 'pressed') {
                if (chgp != 2)
                {
                    tmpImg.src = 'images/plan.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                else
                {
                    tmpImg.src = 'images/plan2.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                if (changePlane)
                {
                    bplane = false;
                    if (iplane > 1 && iplane <= 2)
                    {
                        iplane = iplane - 1;
                        iDialogPage = 2;
                    }
                }
                if(Changelevel)
                {
                    chglevel = false;
                    if (ilevel > 1 && ilevel <= 2)
                    {
                        ilevel = ilevel - 1;
                    }
                }
                if(Changeplayer)
                {
                    ichgplayer = false;
                    if (iplayer > 1)
                    {
                        iplayer = iplayer - 1;
                    }
                }
            }

        }
        button3.state = 'normal';
        button3.imageShift = 0;
        //кнопка Следующий самолет
        if(button4.visible)
        {
            if (button4.state === 'pressed') {
                if (chgp != 2)
                {
                    tmpImg.src = 'images/plan.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 10, 0, plane.w + 5, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                else
                {
                    tmpImg.src = 'images/plan2.png';
                    plane.image.src = tmpImg.src;
                    ctx.drawImage(plane.image, iSprPos * plane.w + 15, 0, plane.w + 10, plane.h, plane.x - plane.w / 2 - 5, plane.y - plane.h / 2 - 360, plane.w, plane.h);
                }
                if (changePlane)
                {
                    bplane = false;
                    if (iplane >= 1 && iplane < 2)
                    {
                        iplane = iplane + 1;
                        iDialogPage = 2;
                    }
                }
                if(Changelevel)
                {
                    chglevel = false;
                    if (ilevel >= 1 && ilevel < 2)
                    {
                        ilevel = ilevel + 1;
                    }
                }
                if (Changeplayer)
                {
                    ichgplayer = false;
                    if (iplayer >= 1)
                    {
                        iplayer = iplayer + 1;
                    }
                }
            }
        }
        button4.state = 'normal';
        button4.imageShift = 0;
        //кнопка паузы
        if(pausebutton.visible)
        {
            if (pausebutton.state === 'pressed') {
                NewGamepbutton.visible = false;
                Continuepbutton.visible = false;
                playerbutton.visible = false;
                exitbutton.visible = false;
                Ok2button.visible = false;
                Okbutton.visible = false;
                button.visible = false;
                helpbutton.visible = false;
                button1.visible = false;
                button2.visible = false;
                button3.visible = false;
                button4.visible = false;
              if (pauseclick == 0)
              {
                drawGradient();
                bPause = true;
                pauseclick = 1;
                button5.visible=true;
                button6.visible=true;
                Soundbutton.visible = true;
              }
              else if (pauseclick == 1)
              {
                bPause = false;
                pauseclick = 0;
                button5.visible=false;
                button6.visible=false;
                Soundbutton.visible = false;
              }
            }
        }
        pausebutton.state = 'normal';
        pausebutton.imageShift = 0;
        //кнопка Сохранить и выйти
        if(button5.visible)
        {
            if (button5.state === 'pressed') {
              //-----save
              var save = {};
              if(!levelEnd)
              { 
                 save.plane={};
                 save.clouds={};
                 save.badoblako={};
                 save.stars={};
                 save.plane.x = plane.x;
                 save.plane.y = plane.y;
               if (clouds.length > 0) {
                       for (var ekey in clouds) {
                               if (clouds[ekey] !== undefined) {
                                       save.clouds[ekey]={};
                                       save.clouds[ekey].x = clouds[ekey].x;
                                       save.clouds[ekey].y = clouds[ekey].y;
                               }
                       }
               }
              if (badoblako.length > 0) {
                       for (var okey in badoblako) {
                               if (badoblako[okey] !== undefined) {
                                       save.badoblako[okey]={};
                                       save.badoblako[okey].x = badoblako[okey].x;
                                       save.badoblako[okey].y = badoblako[okey].y;
                               }
                       }
               }
               if (stars.length > 0) {
                       for (var skey in stars) {
                               if (stars[skey] !== undefined) {
                                       save.stars[skey]={};
                                       save.stars[skey].x = stars[skey].x;
                                       save.stars[skey].y = stars[skey].y;
                              }
                       }
               }
              }
              else
              {
                  save.life = iLife;
                  save.points = points;
                  save.coins = icoinNumber;
              }
               localStorage.setItem('' + Numchgplayer, JSON.stringify(save));
              // alert(localStorage.getItem(''+Numchgplayer));
               //-----
              clear();
              bDrawDialog = true;
              drawDialog();
              isSave = true;
              iDialogPage = 1;
              button.visible = true;
              helpbutton.visible = true;
              playerbutton.visible = true;
              button1.visible = true;
              button2.visible = false;
              button3.visible = false;
              button4.visible = false;
              button5.visible = false;
              button6.visible = false;
              NewGamepbutton.visible = false;
              Continuepbutton.visible = false;
              exitbutton.visible = true;
              Ok2button.visible = false;
              Okbutton.visible = false;
              Soundbutton.visible = false;
              if(isEnd)
              {
                  NoSave();    
              }
            }

        }
        button5.state = 'normal';
        button5.imageShift = 0;
        //кнопка Выйти без сохранения
        if(button6.visible)
        {
            if (button6.state === 'pressed') {
              // clear canvas
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              bDrawDialog = true;
              drawDialog();
              isSave = false;
              iDialogPage = 1;
              NoSave();
              button.visible = true;
              helpbutton.visible = true;
              playerbutton.visible = true;
              button1.visible = true;
              button2.visible = false;
              button3.visible = false;
              button4.visible = false;
              button5.visible = false;
              button6.visible = false;
              NewGamepbutton.visible = false;
              Continuepbutton.visible = false;
              exitbutton.visible = true;
              Ok2button.visible = false;
              Okbutton.visible = false;
              Soundbutton.visible = false;
            }

        }
        button6.state = 'normal';
        button6.imageShift = 0;
        //кнопка Справка
        if(helpbutton.visible)
        {
            if (helpbutton.state === 'pressed') {
                iDialogPage = 3;
            }
        }
        helpbutton.state = 'normal';
        helpbutton.imageShift = 0;
        //кнопка Смена игрока
        if (playerbutton.visible)
        {
            if (playerbutton.state === 'pressed') {
                iDialogPage = 5;
                stars.push(new Stars(ctx.canvas.width / 2 + 120, 545, istarW, istarH, 0, oStarsImage));
                changePlane = false;
              //  Changelevel = false;
                Changeplayer = true;
            }
        }
        playerbutton.state = 'normal';
        playerbutton.imageShift = 0;
        //кнопка OK
        if (Okbutton.visible)
        {
            if (Okbutton.state === 'pressed') {
                if(!Levelmsg)
                {
                    iDialogPage = 2;
                    changePlane = true;
                    iplane = 2;
                    button.visible = false;
                    helpbutton.visible = false;
                    button1.visible = false;
                    playerbutton.visible = false;
                    button2.visible = true;
                    button3.visible = true;
                    button4.visible = true;
                    NewGamepbutton.visible = false;
                    Continuepbutton.visible = false;
                    exitbutton.visible = false;
                    Ok2button.visible = false;
                    Okbutton.visible = false;
                    Soundbutton.visible = false;
                }
                else
                {
                    iDialogPage = 8;
                    Changelevel = true;
                    chglevel = false;
                    button.visible = false;
                    helpbutton.visible = false;
                    playerbutton.visible = false;
                    button1.visible = false;
                    button2.visible = false;
                    button3.visible = false;
                    button4.visible = false;
                    Continuepbutton.visible = false;
                    exitbutton.visible = false;
                    Ok2button.visible = false;
                    Okbutton.visible = false;
                    Soundbutton.visible = false;
                }
            }
        }
        Okbutton.state = 'normal';
        Okbutton.imageShift = 0;
         //кнопка OK2
        if (Ok2button.visible)
        {
            if (Ok2button.state === 'pressed') {
               ilevel = Numchglevel;
               iDialogPage = 0;
               bDrawDialog = false;
               bPause = false;
               button.visible = false;
               helpbutton.visible = false;
               playerbutton.visible = false;
               button1.visible = false;
               button2.visible = false;
               button3.visible = false;
               button4.visible = false;
               Continuepbutton.visible = false;
               exitbutton.visible = false;
               Ok2button.visible = false;
               Okbutton.visible = false;
               Soundbutton.visible = false;
            }
        }
        Ok2button.state = 'normal';
        Ok2button.imageShift = 0;
        //кнопка Выход
        if (exitbutton.visible)
        {
            if (exitbutton.state === 'pressed') {
               window.close();//?
            }
        }
        exitbutton.state = 'normal';
        exitbutton.imageShift = 0;
        //кнопка Вкл/Выкл звук
        if (Soundbutton.visible)
        {
            if (Soundbutton.state === 'pressed') {
              if (Soundbuttonclick == 0)
              {
                  PlaySound = false;
                  Soundbuttonclick = 1;
              }
              else if (Soundbuttonclick == 1)
              {
                 Soundbuttonclick = 0;
                 PlaySound = true;
              }
            }
        }
        Soundbutton.state = 'normal';
        Soundbutton.imageShift = 0;
    });
        displayIntro(); // Display intro once
    });
