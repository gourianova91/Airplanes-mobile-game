//переменные
var canvas, ctx;
var backgroundImage;
var backgroundImage1;
var iBgShiftX = 100;
var button;
var button1;
var bDrawDialog = true;
var iDialogPage = 1;

//var oRocketImage;
var oExplosionImage;
//var introImage;
var oCloudImage;

var iBgShiftY = 9300; //10000 (level length) - 700 (canvas height)
var bPause = false; // game pause
var plane = null; // plane object
//var rockets = []; // array of rockets
var clouds = []; // array of clouds
var explosions = []; // array of explosions
var planeW = 120; // plane width
var planeH = 160; // plane height
var iSprPos = 1; // initial sprite frame for plane
var iMoveDir = 1; // move direction
var iCloudW = 131; // cloud width
var iCloudH = 68; // cloud height
var iRocketSpeed = 10; // initial rocket speed
var iCloudSpeed = 3; // initial cloud speed
var iCloudSpeedMin = 3; // минимальная скорость облака
var iCloudSpeedMax = 4; //максимальная скорость облака
var pressedKeys = []; // array of pressed keys
var iScore = 0; // total score
var iLife = 100; // total life of plane
var iDamage = 10; // damage per cloud plane
var enTimer = null; // random timer for a new cloud
// -------------------------------------------------------------
// -------------------------------------------------------------
// игровые объекты
/*var cloud = null; 
var plane=null;
var cloud = []; //облака

var iCloudW = 32; // ширина облака
var iCloudH = 194; // высота облака
var planeW = 211; // plane width
var planeH = 40; // plane height
var iCloudSpeedMin = 2; // минимальная скорость облака
var iCloudSpeedMax = 5; //максимальная скорость облака*/

// объекты:
function Button(x, y, w, h, state, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = state;
    this.imageShift = 0;
    this.image = image;
	this.visible= true;
}

function Plane(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.bDrag = false;
}
/*function Rocket(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}*/
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

/*function Cloud(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}

function Plane(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    //this.bDrag = false;
    this.fuel = 666;
    this.fuelMax=1000;
}*/

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

            // and add first cloud
            addCloud();
}
    // Add Cloud function (adds a new cloud randomly)
    function addCloud() {
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iCloudH);
    var chanse = getRand(0,100);
    if(chanse <= 70&&!bDrawDialog)
        {
          clouds.push(new Cloud(randX, 0, iCloudW, iCloudH, - getRand(iCloudSpeedMin, iCloudSpeedMax), oCloudImage)); //скорость теперь настраивается перменными
        }
    var interval = getRand(900, 1000);
   // var interval = getRand(5000, 10000);
    enTimer = setInterval(addCloud, interval); // повторение кадров
    }
    
// фукнции отрисовки :

function clear() { // функция очистки canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawDialog() { // функция отрисовки диалога
    if (bDrawDialog) {
        var bg_gradient = ctx.createLinearGradient(0, 200, 0, 400);
        bg_gradient.addColorStop(0.0, 'rgba(246, 211, 175, 0.8)');
        bg_gradient.addColorStop(1.0, 'rgba(209, 188, 167, 0.8)');

        ctx.beginPath(); // начало фигуры
        ctx.fillStyle = bg_gradient;
        ctx.moveTo(0, 0);
        ctx.lineTo(ctx.canvas.width - 2, 0);
        ctx.lineTo(ctx.canvas.width - 2, ctx.canvas.height - 2);
        ctx.lineTo(0, ctx.canvas.height - 2);
        ctx.lineTo(0, 0);
        ctx.closePath(); // конец фигуры
		ctx.fill(); // заполнение фигуры

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(245, 224, 204, 0.5)';
        ctx.stroke(); // отрисовка границы

        // отрисовка текста
        ctx.font = '42px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = '#000';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.fillStyle = '#FFF6EC';
        if (iDialogPage === 1) {
            ctx.fillText('Airplanes mobile game', ctx.canvas.width/2, 100);
            ctx.font = '24px Calibri';
            ctx.fillText('После закрытия диалогового окна Вы сможете', ctx.canvas.width/2, 190);
            ctx.fillText('передвигать самолет с помощью мыши', ctx.canvas.width/2, 220);
            button2.visible=false;
        } else if (iDialogPage === 2) {
            ctx.fillText('Выбор самолета', ctx.canvas.width/2, 100);
            button2.visible=true;
           // ctx.font = '24px Calibri';
           // ctx.fillText('Выбор самолета', ctx.canvas.width/2, 220);
        }
    }
}

function drawButton() { // функция отрисовки кнопки
	if(button.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button.image, 0, button.imageShift, button.w, button.h, button.x, button.y, button.w, button.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Sans Serif';
		ctx.fillStyle = '#FFF6EC';
		ctx.fillText('Играть', ctx.canvas.width/2, ctx.canvas.height/2 - 45);
	}
        if(button1.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button1.image, 0, button1.imageShift, button1.w, button1.h, button1.x, button1.y, button1.w, button1.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Sans Serif';
		ctx.fillStyle = '#FFF6EC';
		ctx.fillText('Выбор самолета', ctx.canvas.width/2 - 2, ctx.canvas.height/2 + 5);
	}
        if(button2.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button2.image, 0, button2.imageShift, button2.w, button2.h, button2.x, button2.y, button2.w, button2.h);

		// отрисовка текста на кнопке
		ctx.font = '20px Sans Serif';
		ctx.fillStyle = '#FFF6EC';
		ctx.fillText('Меню', 85, ctx.canvas.height - 45);
	}
}


// функции рисования:
function drawScene() { // основная функция отрисовки сцены
   // clear(); // очистить canvas
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //очистить холст

   /*/ нарисовать фон
    iBgShiftX += 4;
    if (iBgShiftX >= 1024) {
        iBgShiftX = 0;
    }
    ctx.drawImage(backgroundImage1, 0 + iBgShiftX, 0, 1000, 940, 0, 0, 1000, 600);*/

    
    
    // отрисовка диалога
    drawDialog();
    drawButton();
    if(!bDrawDialog)
    {
        /*/ рисуем самолет
        ctx.drawImage(plane.image, plane.x,plane.y);
        
        // рисуем облака
        if (cloud.length > 0) {
            for (var ekey in cloud) {
                if (cloud[ekey] !== undefined) {
                    ctx.drawImage(cloud[ekey].image, cloud[ekey].x, cloud[ekey].y);
                    cloud[ekey].x += cloud[ekey].speed;

                      if (cloud[ekey].x < cloud[ekey].x - iCloudW) {
                   // if (cloud[ekey].x < - iCloudW) {
                        delete cloud[ekey];
                    }
                }
            }
        }*/
        if (! bPause) {
        iBgShiftY -= 2; // move main ground
        if (iBgShiftY < 5) { // Finish position
            bPause = true;
             clear();
            // draw score
            ctx.font = '40px Verdana';
            ctx.fillStyle = '#FFF6EC';
            ctx.fillText('Finish, your score: ' + iScore * 10 + ' points', ctx.canvas.width/2, ctx.canvas.height/2 - 100);
            return;
        }

        // process pressed keys (movement of plane)
        processPressedKeys();

        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // draw background
        ctx.drawImage(backgroundImage, 0, 0 + iBgShiftY, 700, 700, 0, 0, 700, 700);

        // draw plane
        ctx.drawImage(plane.image, iSprPos*plane.w + 10, 0, plane.w+5, plane.h, plane.x - plane.w/2, plane.y - plane.h/2, plane.w, plane.h);

        /*/ draw rockets
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
        }*/

        // draw explosions
        if (explosions.length > 0) {
            for (var key in explosions) {
                if (explosions[key] != undefined) {
                    // display explosion sprites
                    ctx.drawImage(explosions[key].image, explosions[key].sprite*explosions[key].w, 0, explosions[key].w, explosions[key].h, explosions[key].x - explosions[key].w/2, explosions[key].y - explosions[key].h/2, explosions[key].w, explosions[key].h);
                    explosions[key].sprite++;

                    // remove an explosion object when it expires
                    if (explosions[key].sprite > 10) {
                        delete explosions[key];
                    }
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

        if (clouds.length > 0) {
            for (var ekey in clouds) {
                if (clouds[ekey] != undefined) {

                  /*  // collisions with rockets
                    if (rockets.length > 0) {
                        for (var key in rockets) {
                            if (rockets[key] != undefined) {
                                if (rockets[key].y < clouds[ekey].y + clouds[ekey].h/2 && rockets[key].x > clouds[ekey].x && rockets[key].x + rockets[key].w < clouds[ekey].x + clouds[ekey].w) {
                                    explosions.push(new Explosion(clouds[ekey].x + clouds[ekey].w / 2, clouds[ekey].y + clouds[ekey].h / 2, 120, 120, 0, oExplosionImage));

                                    // delete cloud, rocket, and add +1 to score
                                    delete clouds[ekey];
                                    delete rockets[key];
                                    iScore++;
                                }
                            }
                        }
                    }*/

                    // collisions with plane
                    if (clouds[ekey] != undefined) {
                        if (plane.y - plane.h/2 < clouds[ekey].y + clouds[ekey].h/2 && plane.x - plane.w/2 < clouds[ekey].x + clouds[ekey].w && plane.x + plane.w/2 > clouds[ekey].x) {
                            explosions.push(new Explosion(clouds[ekey].x + clouds[ekey].w / 2, clouds[ekey].y + clouds[ekey].h / 2, 120, 120, 0, oExplosionImage));

                            // delete cloud and make damage
                            delete clouds[ekey];
                            iLife -= iDamage;

                            if (iLife <= 0) { // Game over
                                bPause = true;

                                // draw score
                                ctx.font = '38px Verdana';
                                ctx.fillStyle = '#fff';
                                ctx.fillText('Game over, your score: ' + iScore * 10 + ' points', ctx.canvas.width/2, ctx.canvas.height/2 - 100);
                                return;
                            }
                        }
                    }
                }
            }
        }
    }
        // display life and score
        ctx.font = '14px Verdana';
        ctx.fillStyle = '#FFF6EC';
        ctx.fillText('Life: ' + iLife + ' / 100', 55, 660);
        ctx.fillText('Score: ' + iScore * 10, 55, 680);
    }
}

// -------------------------------------------------------------

// Process Pressed Keys function
function processPressedKeys() {
    if (pressedKeys[37] != undefined) { // 'Left' key
        if (iSprPos > 0) {
            iSprPos = 2;
            iMoveDir = -3;//скорость поворота самолета
        }
        if (plane.x - plane.w / 2 > 10) {
            plane.x += iMoveDir;
        }
    }
    else if (pressedKeys[39] != undefined) { // 'Right' key
        if (iSprPos < 2) {
            iSprPos = 0;
            iMoveDir = 3;
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

    /*/ загрузка фона
    backgroundImage1 = new Image();
    backgroundImage1.src = 'images/1.jpg';
    backgroundImage1.onload = function() {
    }
    backgroundImage1.onerror = function() {
        console.log('Error');
    }*/
    // load background image
    backgroundImage = new Image();
    backgroundImage.src = 'images/levelmap.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }

   /* introImage = new Image();
    introImage.src = 'images/intro.jpg';*/

    /*/ initialization of empty rocket
    oRocketImage = new Image();
    oRocketImage.src = 'images/rocket.png';
    oRocketImage.onload = function() { }*/

    // initialization of explosion image
    oExplosionImage = new Image();
    oExplosionImage.src = 'images/explosion.png';
    oExplosionImage.onload = function() { }

    // initialization of empty cloud
    oCloudImage = new Image();
    oCloudImage.src = 'images/oblako_1.png';
    oCloudImage.onload = function() { }

    // initialization of plane
    var oPlaneImage = new Image();
    oPlaneImage.src = 'images/plan.png';
    oPlaneImage.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlaneImage);
    }
    // загрузка кнопки
    var buttonImage = new Image();
    buttonImage.src = 'images/menu2.png';
    buttonImage.onload = function() {
    }
    button = new Button(ctx.canvas.height/2 - 75, ctx.canvas.width/2 - 50, 151, 38, 'normal', buttonImage);//кнопка Играть
    button1 = new Button(ctx.canvas.height/2 - 75, ctx.canvas.width/2, 151, 38, 'normal', buttonImage); //кнопка Выбор самолета
    button2 = new Button(10, ctx.canvas.height - 50, 151, 38, 'normal', buttonImage); //кнопка возврат в Меню из диалога Выбора самолета
    
   /* // инициализация пустого облака
    var oCloudImage = new Image();
    oCloudImage.src = 'images/cloud1.gif';
    oCloudImage.onload = function() { }
    
    // инициализация самолета
    var oPlaneImage = new Image();
    oPlaneImage.src = 'images/plane.gif';
    oPlaneImage.onload = function() {
        plane = new Plane(5+planeW, canvas.height/2, planeW, planeH, oPlaneImage);
    }*/
    
    $(window).keydown(function (evt){ // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (! pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }

        if (bPause && evt.keyCode == 13) { // in case of Enter button
            bPause = false;

            // start main animation
            setInterval(drawScene, 20); // loop drawScene

            // and add first cloud
            addCloud();
        }
    });

    $(window).keyup(function (evt) { // onkeyup event handle
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode]; // remove pressed key from array
        }
        //if (evt.keyCode == 65) { // 'A' button - add a rocket
            //rockets.push(new Rocket(plane.x - 16, plane.y - plane.h, 32, 32, iRocketSpeed, oRocketImage));
       // }
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

    $('#scene').mousedown(function(e) { // привязываем событие нажатия мыши (для перетаскивания)

        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;

        // поведение кнопок
        if(button.visible)
        {        
            if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
                button.state = 'pressed';
                button.imageShift = 82;
            }
        }
        if(button1.visible)
        {        
            if (mouseX > button1.x && mouseX < button1.x+button1.w && mouseY > button1.y && mouseY < button1.y+button1.h) {
                button1.state = 'pressed';
                button1.imageShift = 82;
            }
        }
        if(button2.visible)
        {        
            if (mouseX > button2.x && mouseX < button2.x+button2.w && mouseY > button2.y && mouseY < button2.y+button2.h) {
                button2.state = 'pressed';
                button2.imageShift = 82;
            }
        }   
    });

    $('#scene').mousemove(function(e) { // привязываем событие движения мыши
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;

        // поведение кнопок
        if(button.visible)
        {
            if (button.state != 'pressed') {
                button.state = 'normal';
                button.imageShift = 0;
                if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
                    button.state = 'hover';
                    button.imageShift = 40;
                }
            }
        }
        if(button1.visible)
        {
            if (button1.state != 'pressed') {
                button1.state = 'normal';
                button1.imageShift = 0;
                if (mouseX > button1.x && mouseX < button1.x+button1.w && mouseY > button1.y && mouseY < button1.y+button1.h) {
                    button1.state = 'hover';
                    button1.imageShift = 40;
                }
            }
        }
        if(button2.visible)
        {
            if (button2.state != 'pressed') {
                button2.state = 'normal';
                button2.imageShift = 0;
                if (mouseX > button2.x && mouseX < button2.x+button2.w && mouseY > button2.y && mouseY < button2.y+button2.h) {
                    button2.state = 'hover';
                    button2.imageShift = 40;
                }
            }
        }
    });

    $('#scene').mouseup(function(e) { // привязываем событие отжатия кнопки

        // поведение кнопок
        if(button.visible)
        {
            if (button.state === 'pressed') {
                iDialogPage = 0;
                bDrawDialog = !bDrawDialog;
                button.visible=false;
                button1.visible=false;
                button2.visible=false;
            }
                
        }
        button.state = 'normal';
        button.imageShift = 0;
        if(button1.visible)
        {
            if (button1.state === 'pressed') {
                iDialogPage = 2;
            //    bDrawDialog = !bDrawDialog;
                button.visible=false;
                button1.visible=false;
                button2.visible=false;
            }

        }
        button1.state = 'normal';
        button1.imageShift = 0;
        if(button2.visible)
        {
            if (button2.state === 'pressed') {
                iDialogPage = 1;
            //    bDrawDialog = !bDrawDialog;
               // button.visible=false;
              //  button1.visible=false;
              button2.visible=false;
              button.visible=true;
              button1.visible=true;
            }

        }
        button2.state = 'normal';
        button2.imageShift = 0;
    });
    
   // setInterval(drawScene, 30); // повторение кадров
    
    // генерировать облака случайно
    /*var enTimer = null;
    function addCloud() {
        clearInterval(enTimer);

        var randY = getRand(0, canvas.height - iCloudH);
        var chanse = getRand(0,100);
        if(chanse <= 70&&!bDrawDialog)
        {
            cloud.push(new Cloud(canvas.width, randY, iCloudW, iCloudH, - getRand(iCloudSpeedMin, iCloudSpeedMax), oCloudImage)); //скорость теперь настравивается перменными
      //  cloud.push(new Cloud(canvas.width, randY, iCloudW, iCloudH, - iCloudSpeed, oCloudImage));
        }
        var interval = getRand(5000, 10000);
        enTimer = setInterval(addCloud, interval); // повторение кадров
    }*/
    //addCloud();
        displayIntro(); // Display intro once
    });
