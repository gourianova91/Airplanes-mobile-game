// переменные
var canvas, ctx;
var backgroundImage;
var iBgShiftX = 100;

// игровые объекты
var cloud = null; 
var cloud = []; //облака

var iCloudW = 32; // ширина облака
var iCloudH = 194; // высота облака
var iCloudSpeed = 2; // скорость облака

// объекты:
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

// функции рисования :
function drawScene() { // основная функция отрисовки сцены
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //очистить холст

    // нарисовать фон
    iBgShiftX += 4;
    if (iBgShiftX >= 1024) {
        iBgShiftX = 0;
    }
    ctx.drawImage(backgroundImage, 0 + iBgShiftX, 0, 1000, 940, 0, 0, 1000, 600);

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
}

// -------------------------------------------------------------

// инициализация
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    // загрузка фона
    backgroundImage = new Image();
    backgroundImage.src = 'images/1.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error');
    }
    
    // инициализация пустого облака
    var oCloudImage = new Image();
    oCloudImage.src = 'images/cloud1.gif';
    oCloudImage.onload = function() { }
    
    setInterval(drawScene, 30); // повторение кадров
    
    // генерировать облака случайно
    var enTimer = null;
    function addCloud() {
        clearInterval(enTimer);

        var randY = getRand(0, canvas.height - iCloudH);
        cloud.push(new Cloud(canvas.width, randY, iCloudW, iCloudH, /*- iCloudSpeed*/ - getRand(1, 5), oCloudImage));
      //  cloud.push(new Cloud(canvas.width, randY, iCloudW, iCloudH, - iCloudSpeed, oCloudImage));

        var interval = getRand(5000, 10000);
        enTimer = setInterval(addCloud, interval); // повторение кадров
    }
    addCloud();
    });