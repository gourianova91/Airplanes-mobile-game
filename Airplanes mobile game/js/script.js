//переменные
var canvas, ctx;
var backgroundImage;
var backgroundImage1;
var iBgShiftX = 100;
var button;
var button1;
var bDrawDialog = true;
var iDialogPage = 1;
// -------------------------------------------------------------
// игровые объекты
var cloud = null; 
var cloud = []; //облака

var iCloudW = 32; // ширина облака
var iCloudH = 194; // высота облака
var iCloudSpeedMin = 2; // минимальная скорость облака
var iCloudSpeedMax = 5; //максимальная скорость облака

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

function Cloud(x, y, w, h, speed, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
}

// -------------------------------------------------------------
// получить случайное число между X и Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

// фукнции отрисовки :

function clear() { // функция очистки canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function drawDialog() { // функция отрисовки диалога
    if (bDrawDialog) {
        var bg_gradient = ctx.createLinearGradient(0, 200, 0, 400);
        bg_gradient.addColorStop(0.0, 'rgba(160, 160, 160, 0.8)');
        bg_gradient.addColorStop(1.0, 'rgba(250, 250, 250, 0.8)');

        ctx.beginPath(); // начало фигуры
        ctx.fillStyle = bg_gradient;
        ctx.moveTo(100, 100);
        ctx.lineTo(900, 100);
        ctx.lineTo(900, 500);
        ctx.lineTo(100, 500);
        ctx.lineTo(100, 100);
        ctx.closePath(); // конец фигуры
		ctx.fill(); // заполнение фигуры

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.5)';
        ctx.stroke(); // отрисовка границы

        // отрисовка текста
        ctx.font = '42px Calibri';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.shadowColor = '#000';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.fillStyle = '#fff';
        if (iDialogPage === 1) {
            ctx.fillText('Airplanes mobile game', ctx.canvas.width/2, 150);
            ctx.font = '24px Calibri';
            ctx.fillText('После закрытия диалогового окна Вы сможете', ctx.canvas.width/2, 250);
            ctx.fillText('передвигать самолет с помощью мыши', ctx.canvas.width/2, 280);
        }
    }
}

function drawButton() { // функция отрисовки кнопки
	if(button.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button.image, 0, button.imageShift, button.w, button.h, button.x, button.y, button.w, button.h);

		// отрисовка текста на кнопке
		ctx.font = '32px Calibri';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Играть', 500, 354);
	}
        if(button1.visible==true)
	{
		// отрисовка кнопки
		ctx.drawImage(button1.image, 0, button1.imageShift, button1.w, button1.h, button1.x, button1.y, button1.w, button1.h);

		// отрисовка текста на кнопке
		ctx.font = '25px Calibri';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Меню', 127, 545);
	}
}

// функции рисования:
function drawScene() { // основная функция отрисовки сцены
    clear(); // очистить canvas
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //очистить холст

    // нарисовать фон
    iBgShiftX += 4;
    if (iBgShiftX >= 1024) {
        iBgShiftX = 0;
    }
    ctx.drawImage(backgroundImage1, 0 + iBgShiftX, 0, 1000, 940, 0, 0, 1000, 600);

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
    }
    
    // отрисовка диалога
    drawDialog();
	drawButton();
    
}

// -------------------------------------------------------------

// инициализация
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    // загрузка фона
    backgroundImage1 = new Image();
    backgroundImage1.src = 'images/1.jpg';
    backgroundImage1.onload = function() {
    }
    backgroundImage1.onerror = function() {
        console.log('Error');
    }
    
    // инициализация пустого облака
    var oCloudImage = new Image();
    oCloudImage.src = 'images/cloud1.gif';
    oCloudImage.onload = function() { }
    
    // загрузка кнопки
    var buttonImage = new Image();
    buttonImage.src = 'images/menu1.png';
    buttonImage.onload = function() {
    }
    button = new Button(380, 350, 250, 50, 'normal', buttonImage);
    button1 = new Button(0, 535, 200, 52, 'normal', buttonImage);

    $('#scene').mousedown(function(e) { // привязываем событие нажатия мыши (для перетаскивания)

        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;
        
           if (!bDrawDialog) {
               //
        }

        // поведение кнопок
        if(button.visible)
        {        
            if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
                button.state = 'pressed';
                button.imageShift = 174;
            }
        }
        if(button1.visible)
        {        
            if (mouseX > button1.x && mouseX < button1.x+button1.w && mouseY > button1.y && mouseY < button1.y+button1.h) {
                button1.state = 'pressed';
                button1.imageShift = 398;
            }
        }
    });

    $('#scene').mousemove(function(e) { // привязываем событие движения мыши
        var mouseX = e.layerX || 0;
        var mouseY = e.layerY || 0;

        if (!bDrawDialog && cloud.bDrag) {
        }

        // поведение кнопок
        if(button.visible)
        {
            if (button.state != 'pressed') {
                button.state = 'normal';
                button.imageShift = 8;
                if (mouseX > button.x && mouseX < button.x+button.w && mouseY > button.y && mouseY < button.y+button.h) {
                    button.state = 'hover';
                    button.imageShift = 91;
                }
            }
        }
        if(button1.visible)
        {
            if (button1.state != 'pressed') {
                button1.state = 'normal';
                button1.imageShift = 249;
                if (mouseX > button1.x && mouseX < button1.x+button1.w && mouseY > button1.y && mouseY < button1.y+button1.h) {
                    button1.state = 'hover';
                    button1.imageShift = 323;
                }
            }
        }
    });

    $('#scene').mouseup(function(e) { // привязываем событие отжатия кнопки

        // поведение кнопок
        if(button.visible)
        {
            if (button.state === 'pressed') {
                if (iDialogPage === 0) {
                    iDialogPage++;
                    bDrawDialog = !bDrawDialog;
                                    button.visible=false;
                } else {
                    iDialogPage = 0;
                    bDrawDialog = !bDrawDialog;
                    iDialogPage++;
                                    button.visible=false;
                }
            }
        }
        button.state = 'normal';
        button.imageShift = 8;
        if(button1.visible)
        {
            if (button1.state === 'pressed') {
                if (iDialogPage === 0) {
                    iDialogPage++;
                    bDrawDialog = !bDrawDialog;
                                   // button1.visible=false;
                                    button.visible=false;
                } else {
                    iDialogPage = 0;
                    bDrawDialog = !bDrawDialog;
                    iDialogPage++;
                                   // button1.visible=false;
                                    button.visible=false;
                }
            }
        }
        
        button1.state = 'normal';
        button1.imageShift = 249;
    });
    
    setInterval(drawScene, 30); // повторение кадров
    
    // генерировать облака случайно
    var enTimer = null;
    function addCloud() {
        clearInterval(enTimer);

        var randY = getRand(0, canvas.height - iCloudH);
        var chanse = getRand(0,100);
        if(chanse <= 70)
        {
            cloud.push(new Cloud(canvas.width, randY, iCloudW, iCloudH, - getRand(iCloudSpeedMin, iCloudSpeedMax), oCloudImage)); //скорость теперь настравивается перменными
      //  cloud.push(new Cloud(canvas.width, randY, iCloudW, iCloudH, - iCloudSpeed, oCloudImage));
        }
        var interval = getRand(5000, 10000);
        enTimer = setInterval(addCloud, interval); // повторение кадров
    }
    addCloud();
    });
