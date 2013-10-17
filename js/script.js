/**
 *
 * SkyWalker game
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */


// inner variables
var canvas, ctx;

// images
var backgroundImage;
var oRocketImage;
var oExplosionImage;
var introImage;
var oEnemyImage;

var iBgShiftY = 9300; //10000 (level length) - 700 (canvas height)
var bPause = false; // game pause
var plane = null; // plane object
var rockets = []; // array of rockets
var enemies = []; // array of enemies
var explosions = []; // array of explosions
var planeW = 120; // plane width
var planeH = 160; // plane height
var iSprPos = 1; // initial sprite frame for plane
var iMoveDir = 1; // move direction
var iEnemyW = 128; // enemy width
var iEnemyH = 128; // enemy height
var iRocketSpeed = 10; // initial rocket speed
var iEnemySpeed = 5; // initial enemy speed
var pressedKeys = []; // array of pressed keys
var iScore = 0; // total score
var iLife = 100; // total life of plane
var iDamage = 10; // damage per enemy plane
var enTimer = null; // random timer for a new enemy
// -------------------------------------------------------------

// objects :
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
function Explosion(x, y, w, h, sprite, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.sprite = sprite;
    this.image = image;
}
// -------------------------------------------------------------
// get random number between X and Y
function getRand(x, y) {
    return Math.floor(Math.random()*y)+x;
}

// Display Intro function
function displayIntro() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.drawImage(introImage, 0, 0,700, 700);
    setInterval(drawScene, 20); // loop drawScene

            // and add first enemy
            addEnemy();
}

// Draw Main scene function
function drawScene() {

    if (! bPause) {
        iBgShiftY -= 2; // move main ground
        if (iBgShiftY < 5) { // Finish position
            bPause = true;

            // draw score
            ctx.font = '40px Verdana';
            ctx.fillStyle = '#fff';
            ctx.fillText('Finish, your score: ' + iScore * 10 + ' points', 50, 200);
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

        if (enemies.length > 0) {
            for (var ekey in enemies) {
                if (enemies[ekey] != undefined) {

                    // collisions with rockets
                    if (rockets.length > 0) {
                        for (var key in rockets) {
                            if (rockets[key] != undefined) {
                                if (rockets[key].y < enemies[ekey].y + enemies[ekey].h/2 && rockets[key].x > enemies[ekey].x && rockets[key].x + rockets[key].w < enemies[ekey].x + enemies[ekey].w) {
                                    explosions.push(new Explosion(enemies[ekey].x + enemies[ekey].w / 2, enemies[ekey].y + enemies[ekey].h / 2, 120, 120, 0, oExplosionImage));

                                    // delete enemy, rocket, and add +1 to score
                                    delete enemies[ekey];
                                    delete rockets[key];
                                    iScore++;
                                }
                            }
                        }
                    }

                    // collisions with plane
                    if (enemies[ekey] != undefined) {
                        if (plane.y - plane.h/2 < enemies[ekey].y + enemies[ekey].h/2 && plane.x - plane.w/2 < enemies[ekey].x + enemies[ekey].w && plane.x + plane.w/2 > enemies[ekey].x) {
                            explosions.push(new Explosion(enemies[ekey].x + enemies[ekey].w / 2, enemies[ekey].y + enemies[ekey].h / 2, 120, 120, 0, oExplosionImage));

                            // delete enemy and make damage
                            delete enemies[ekey];
                            iLife -= iDamage;

                            if (iLife <= 0) { // Game over
                                bPause = true;

                                // draw score
                                ctx.font = '38px Verdana';
                                ctx.fillStyle = '#fff';
                                ctx.fillText('Game over, your score: ' + iScore * 10 + ' points', 25, 200);
                                return;
                            }
                        }
                    }
                }
            }
        }


        // display life and score
        ctx.font = '14px Verdana';
        ctx.fillStyle = '#fff';
        ctx.fillText('Life: ' + iLife + ' / 100', 50, 660);
        ctx.fillText('Score: ' + iScore * 10, 50, 680);
    }
}


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

// Add Enemy function (adds a new enemy randomly)
function addEnemy() {
    clearInterval(enTimer);

    var randX = getRand(0, canvas.height - iEnemyH);
    enemies.push(new Enemy(randX, 0, iEnemyW, iEnemyH, - iEnemySpeed, oEnemyImage));

    var interval = getRand(900, 1000);
    enTimer = setInterval(addEnemy, interval); // loop
}

// Main Initialization
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');

    // load background image
    backgroundImage = new Image();
    backgroundImage.src = 'images/levelmap.jpg';
    backgroundImage.onload = function() {
    }
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }

    introImage = new Image();
    introImage.src = 'images/intro.jpg';

    // initialization of empty rocket
    oRocketImage = new Image();
    oRocketImage.src = 'images/rocket.png';
    oRocketImage.onload = function() { }

    // initialization of explosion image
    oExplosionImage = new Image();
    oExplosionImage.src = 'images/explosion.png';
    oExplosionImage.onload = function() { }

    // initialization of empty enemy
    oEnemyImage = new Image();
    oEnemyImage.src = 'images/oblako_1.png';
    oEnemyImage.onload = function() { }

    // initialization of plane
    var oPlaneImage = new Image();
    oPlaneImage.src = 'images/plan.png';
    oPlaneImage.onload = function() {
        plane = new Plane(canvas.width / 2, canvas.height - 100, planeW, planeH, oPlaneImage);
    }

    $(window).keydown(function (evt){ // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (! pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }

        if (bPause && evt.keyCode == 13) { // in case of Enter button
            bPause = false;

            // start main animation
            setInterval(drawScene, 20); // loop drawScene

            // and add first enemy
            addEnemy();
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

    // when intro is ready - display it
    introImage.onload = function() {
        displayIntro(); // Display intro once
    }
});