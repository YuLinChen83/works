var player1 = null;
var player2 = null;

/* Player1 */
var backgroundImage;
var oPillarImage;
var canvas, ctx;
var iBgShiftX = 0;
var iBgShiftX_2 = 0;
var pillars = [];
var pTimer;
var iPillarW = 128;
var iPillarH = 128;
var iPillarSpeed = 2; // initial speed
var rPillarW, rPillarH;
var PillarsArray = new Array();
var kenImage;
var CoinImage;
var SpriteImage;
var ken1; //ken的物件
var coins = [];
var toolsReverse = []; //道具反轉
var toolsAnesthetize = []; //人物麻痺
var k = 0;
var delay = 0; //kenDelayTime的count
var kenDelayTime = 1; //ken圖片延遲的時間,畫幾次場景才會畫一張人物圖
var state = "walk"; //ken的狀態
var pressedKeys = [];
var jumpFar = 5; //跳的高度
var rlPH; //前後柱子高差
var nowWidth = 600; //目前經過的距離
var dis = 0; //柱子間的距離
var woodsW = []; //木板長的標準答案
var woodsdy = [];
var isH = [];
var kenIndex = 0;
var coinCount = 0;
var coinAni = 0;
var toolReverseAnimate = 6;
var toolReverseCount = 0;
var toolAnesthetizeAnimate = 6;
var toolAnesthetizeCount = 0;
var isON = false;
var pNum = 100;
var coinPosition;
var coinsPoint = 0;
var user_rotate;
var canMove = true;
var isOK = false; //ok值
var addSpeedCount = 0;
var isOnWood = false;
var whichwood = 0;
var kenStop = false;
var wood_correct_rotate;
var wood_correct_rotate1;
var wood_rotate;
var isStart = false;
var startTime = 3;
var WoodR = 1;
var reverseTime = 0;
var anesthetizeTime = 0;
var life = 15;
var reliveR = false;
var woodOK = 0;
var isOK2 = [];
var woodCorrectCount = 0;
var jumpCount = 3;
var isReborn = false;
var RebornCount = 0;
var bgAlpha = 1;
var sunsetAlpha = 0;
var count = 0;

/* Player2 */
var backgroundImage2;
var oPillarImage2;
var canvas2, ctx2;
var iBgShiftX2 = 0;
var iBgShiftX_2_2 = 0;
var pillars2 = [];
var pTimer2;
var iPillarW2 = 128;
var iPillarH2 = 128;
var iPillarSpeed2 = 2; // initial speed
var rPillarW2, rPillarH2;
var PillarsArray2 = new Array();
var kenImage2;
var CoinImage2;
var SpriteImage2;
var ken2; //ken的物件
var coins2 = [];
var toolsReverse2 = []; //道具反轉
var toolsAnesthetize2 = []; //人物麻痺
var k2 = 0;
var delay2 = 0; //kenDelayTime的count
var kenDelayTime2 = 1; //ken圖片延遲的時間,畫幾次場景才會畫一張人物圖
var state2 = "walk"; //ken的狀態
var pressedKeys2 = [];
var jumpFar2 = 5; //跳的高度
var rlPH2; //前後柱子高差
var nowWidth2 = 600; //目前經過的距離
var dis2 = 0; //柱子間的距離
var woodsW2 = []; //木板長的標準答案
var woodsdy2 = [];
var isH2 = [];
var kenIndex2 = 0;
var coinCount2 = 0;
var coinAni2 = 0;
var toolReverseAnimate2 = 6;
var toolReverseCount2 = 0;
var toolAnesthetizeAnimate2 = 6;
var toolAnesthetizeCount2 = 0;
var isON2 = false;
var pNum2 = 50;
var coinPosition2;
var coinsPoint2 = 0;
var user_rotate2;
var canMove2 = true;
var isOK_2 = false; //ok值
var addSpeedCount2 = 0;
var isOnWood2 = false;
var whichwood2 = 0;
var kenStop2 = false;
var wood_correct_rotate2;
var wood_correct_rotate21;
var wood_rotate2;
var isStart2 = false;
var startTime2 = 3;
var WoodR2 = 1;
var reverseTime2 = 0;
var anesthetizeTime2 = 0;
var life2 = 15;
var reliveR2 = false;
var woodOK2 = 0;
var isOK_2_2 = [];
var woodCorrectCount2 = 0;
var jumpCount2 = 3;
var isReborn2 = false;
var RebornCount2 = 0;
var bgAlpha2 = 1;
var sunsetAlpha2 = 0;

/* sounds */
var audioElement;
var jumpaudio;
var ohaudio;
var reverseaudio;
var coinaudio;
var anesthetizeaudio;



function drawKen2() {
    kenDelayTime2 = 1;
    if (delay2 > kenDelayTime2) {
        k2 = k2 + 70;
        if (k2 > 423) {
            k2 = 0;
        }
        delay2 = 0;
    }

    ctx2.drawImage(SpriteImage2, 3 + k2, 96, ken2.w, ken2.h, ken2.x, ken2.y, ken2.w, ken2.h);
    delay2++;
}

function drawStop2() {
    kenDelayTime2 = 3;
    if (delay2 > kenDelayTime2) {
        k2 = k2 + 71;
        if (k2 > 423) {
            k2 = 0;
        }
        delay2 = 0;
    }

    ctx2.drawImage(SpriteImage2, 3 + k2, 452, ken2.w, ken2.h, ken2.x, ken2.y, ken2.w, ken2.h);
    delay2++;
}

function drawJump2() {
    kenDelayTime2 = 10;
    if (delay2 > kenDelayTime2) {
        k2 = k2 + 69;
        delay2 = 0;
    }
    ken2.y = ken2.y - jumpFar2;
    ctx2.drawImage(SpriteImage, 0 + k2, 676, 69, 110, ken2.x, ken2.y - 10, 69, 110);
    delay2++;
    if (k2 >= 207) {
        //k2 = 0;
        state2 = "down";
        delay2 = 0;
    }
}

function drawDown2() {
    kenDelayTime2 = 10;
    if (delay2 > kenDelayTime2) {
        k2 = k2 + 69;
        delay2 = 0;
    }
    ken2.y = ken2.y + jumpFar2;
    ctx2.drawImage(SpriteImage, 0 + k2, 676, 69, 110, ken2.x, ken2.y - 10, 69, 110);
    delay2++;
    if (k2 >= 414) {
        state2 = "walk";
        k2 = 0;
        delay2 = 0;
    }
}

function two2() {
    startTime2 = 2;
}

function one2() {
    startTime2 = 1;
}

function zero2() {
    startTime2 = 0;
    isStart2 = true;
}

function addSpeed2() {
    kenDelayTime2 = 0.5;
    ken2.x += iPillarSpeed2 * 3;
    if (isOnWood2 == true) {
        ken2.y += woodsdy2[whichwood2] * 3;
    }
    if (delay2 > kenDelayTime2) {
        k2 = k2 + 71;
        if (k2 > 423) {
            k2 = 0;
        }
        delay2 = 0;
    }
    ctx2.font = "30px Georgia";
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 5;
    ctx2.strokeText("衝刺～～", ctx2.canvas.width / 2 - 200, 50);
    ctx2.fillStyle = "darkmagenta";
    ctx2.fillText("衝刺～～", ctx2.canvas.width / 2 - 200, 50);

    ctx2.drawImage(SpriteImage2, 0 + k2, 96, ken2.w, ken2.h, ken2.x, ken2.y, ken2.w, ken2.h);
    delay2++;
    addSpeedCount2--;
}

function reverse2() {
    WoodR2 = -1;
    //reverseTime2--;
}

function anesthetize2() {
    anesthetizeTime2--;
    kenStop2 = true;
    ctx2.font = "30px Georgia";
    ctx2.strokeStyle = "white";
    ctx2.lineWidth = 5;
    ctx2.strokeText("糟糕～麻痺！", ctx2.canvas.width / 2 - 100, 50);
    ctx2.fillStyle = "darkmagenta";
    ctx2.fillText("糟糕～麻痺！", ctx2.canvas.width / 2 - 100, 50);
}

function reborn2() {
    state2 = "walk";
    isOK_2_2[woodOK2] = true;
    woodOK2++;
    ken2.x = pillars2[woodOK2].x;
    ken2.y = pillars2[woodOK2].y - ken2.h;
}

var coinsNums2;

//畫木板
/*
x: pillars[pkey].x + pillars[pkey].w;
y: pillars[pkey].y;
length: woodsW[pkey];
r: pillars[pkey].nextD;
h: isH[pkey]*/
function drawCorrectWood2(x, y, length, r, h) {
    ctx2.beginPath();
    ctx2.fillStyle = "#8B4513";
    ctx2.translate(x, y);
    //因為算的rotate弧度都是正的所以要判斷協哪邊（柱子相對高/低來判斷）
    if (h != "high") {
        ctx2.rotate(getRotate(r, length));
        ctx2.fillRect(0, 0, length, 8);
        ctx2.rotate(-getRotate(r, length));
        ctx2.translate(-x, -y);
        ctx2.closePath();
    } else {
        ctx2.rotate(Math.PI / 180 - getRotate(r, length));
        ctx2.fillRect(0, 0, length, 8);
        ctx2.rotate(-(Math.PI / 180 - getRotate(r, length)));
        ctx2.translate(-x, -y);
        ctx2.closePath();
    }
}

//畫木板
function drawWood2(x, y, length, r, h) {
    ctx2.beginPath();
    ctx2.fillStyle = "#FFFF33";
    ctx2.translate(x, y);
    ctx2.rotate(user_rotate2 * WoodR2);
    ctx2.fillRect(0, 0, length, 8);
    ctx2.rotate(-user_rotate2 * WoodR2);
    ctx2.translate(-x, -y);
    ctx2.closePath();
    //記錄使用者角度（用來判斷是否正確
    wood_rotate2 = user_rotate2 * 10;
    //記錄正確角度（用來判斷是否正確
    if (h != "high") {
        wood_correct_rotate2 = Math.round(getRotate(r, length) * 10);
        if (0.5 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < 0.7) {
            wood_correct_rotate21 = Math.floor(getRotate(r, length) * 10);
            //ctx.fillText("range:0.5~0.7", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);
        } else if (0.3 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < 0.5) {
            wood_correct_rotate21 = Math.ceil(getRotate(r, length) * 10);
            //ctx.fillText("range:0.3~0.5", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);

        } else {
            wood_correct_rotate21 = Math.round(getRotate(r, length) * 10);
        }
        if (reverseTime2 > 0) { //if反轉道具效果產生
            wood_correct_rotate2 = wood_correct_rotate2 * (-1);
            wood_correct_rotate21 = wood_correct_rotate21 * (-1);
        }
    } else {
        wood_correct_rotate2 = -1 * Math.round(getRotate(r, length) * 10);
        if (-0.5 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < -0.7) {
            wood_correct_rotate21 = -1 * Math.ceil(getRotate(r, length) * 10);
            //ctx.fillText("range:-0.5~-0.7", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);
        } else if (-0.3 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < -0.5) {
            wood_correct_rotate21 = -1 * Math.floor(getRotate(r, length) * 10);
            //ctx.fillText("range:-0.3~-0.5", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);
        } else {
            wood_correct_rotate21 = -1 * Math.round(getRotate(r, length) * 10);
        }
        if (reverseTime2 > 0) { //if反轉道具效果產生
            wood_correct_rotate2 = wood_correct_rotate2 * (-1);
            wood_correct_rotate21 = wood_correct_rotate21 * (-1);
        }
    }
}


function init() {
    audioElement = document.getElementById('soundtrack');
    audioElement.volume = 0.6;
    audioElement.play();
}

function playjumpsound() {
    jumpaudio = document.getElementById('jumpsound');
    jumpaudio.volume = 0.5;
    jumpaudio.currentTime = 0;
    jumpaudio.play();
}

function playreversesound() {
    reverseaudio = document.getElementById('reversesound');
    reverseaudio.volume = 0.4;
    reverseaudio.currentTime = 0;
    reverseaudio.play();
}

function coinsound() {
    coinaudio = document.getElementById('coinsound');
    coinaudio.volume = 1;
    coinaudio.currentTime = 0;
    coinaudio.play();
}

function playanesthetizesound() {
    anesthetizeaudio = document.getElementById('anesthetizesound');
    anesthetizeaudio.volume = 1;
    anesthetizeaudio.currentTime = 0;
    anesthetizeaudio.play();
}



//使用者畫木板
//$(document).ready(function() {
function doDrawAjax2() {
    $.ajax({
        type: "POST",
        url: "json_user.php",

        success: function(data) //讀JSON成功
            {

                var aaa = eval(data);
                user_rotate2 = aaa[1].dt_y / 10;
                setTimeout(doDrawAjax2, 200);

            },
        error: function(xhr, textStatus, err) //顯示錯誤
            {
                console.log("readyState: " + xhr.readyState);
                console.log("responseText: " + xhr.responseText);
                console.log("status: " + xhr.status);
                console.log("text status: " + textStatus);
                console.log("error: " + err);
            }
    });

}
doDrawAjax2();

function doToolAjax2() {
    $.ajax({
        type: "POST",
        url: "json_tool.php",

        success: function(data) //讀JSON成功
            {

                var tool = eval(data);
                if (tool[1].dt_jump == 1) { //手機按jump
                    if (state2 == "walk" && addSpeedCount2 == 0) {
                        state2 = "jump";
                        delay2 = 0;
                        k2 = 0;
                    }
                }
                if (tool[1].dt_ok == 1) { //手機按ok
                    if (wood_correct_rotate2 == wood_rotate2) {
                        isOK_2 = true;
                        isOK_2_2[woodOK2] = true;
                        woodOK2++;
                        kenStop2 = false;
                        reverseTime2 = 0;
                    } else {
                        //life2--;
                    }

                }
                if (tool[1].dt_tool1 == 1 && (state2 == "walk" || state2 == "stop")) { //加速
                    addSpeedCount2 = 40;
                    spend_speed2++;
                } else if (tool[1].dt_tool2 == 1) { //復活
                    isReborn2 = true;
                    RebornCount2 = 40;
                    spend_reborn2++;
                } else if (tool[1].dt_tool3 == 1) { //陷害player1反轉
                    playreversesound();
                    reverseTime = 800;
                    spend_reverse2++;
                } else if (tool[1].dt_tool4 == 1) { //陷害player1痲痹
                    playanesthetizesound();
                    anesthetizeTime = 50;
                    spend_anesthetize2++;
                }
                setTimeout(doToolAjax2, 200);

            },
        error: function(xhr, textStatus, err) //顯示錯誤
            {
                console.log("readyState: " + xhr.readyState);
                console.log("responseText: " + xhr.responseText);
                console.log("status: " + xhr.status);
                console.log("text status: " + textStatus);
                console.log("error: " + err);
            }
    });

}
doToolAjax2();

//});

$(function() {
    canvas2 = document.getElementById('scene2');
    ctx2 = canvas2.getContext('2d');
    oPillarImage2 = new Image();
    oPillarImage2.src = 'img/pillar.jpg';
    oPillarImage2.onload = function() {}
    oPillarImage2.onerror = function() {
        console2.log('Error loading the enemy image.');
    }
    CoinImage2 = new Image();
    CoinImage2.src = 'img/coin1.png';
    CoinImage2.onload = function() {}
    CoinImage2.onerror = function() {
        console.log('Error loading the coin image.');
    }

    SpriteImage2 = new Image();
    SpriteImage2.src = 'img/sprite.png';
    SpriteImage2.onload = function() {}
    SpriteImage2.onerror = function() {
        console.log('Error loading the sprite image.');
    }

    setTimeout(two2, 1000); // 2秒後執行
    setTimeout(one2, 1500); // 3
    setTimeout(zero2, 3000); // 4

    kenImage2 = new Image();
    kenImage2.src = 'img/ken.png';
    kenImage2.onload = function() {
        //ken2 = new ken(650, pillars2[0].y - 90, 70, 90, kenImage2);
    }

    kenImage2.onerror = function() {
        console.log('Error loading the ken image.');
    }


    $(window).keydown(function(evt) { // onkeydown event handle
        var pk = pressedKeys2[evt.keyCode];
        if (!pk) {
            pressedKeys2[evt.keyCode] = 1; // add all pressed keys into array
        }

        if (evt.keyCode == 76 && (state2 == "walk" || state2 == "stop")) { //加速前進一小段距離 'L'
            addSpeedCount2 = 40;
        }

        if (evt.keyCode == 80) { //'P'
            isReborn2 = true;
            RebornCount2 = 40;
        }
        if (evt.keyCode == 78) { //'N'
            playreversesound();
            reverseTime = 800;
        }

        if (evt.keyCode == 77) { //'M'
            playanesthetizesound();
            anesthetizeTime = 50;
        }
    });

    $(window).keyup(function(evt) { // onkeyup event handle
        var pk = pressedKeys2[evt.keyCode];
        if (pk) {
            delete pressedKeys2[evt.keyCode]; // remove pressed key from array
        }
        if (evt.keyCode == 75) { // 'K' button jump
            if (state2 == "walk" && addSpeedCount2 == 0) {
                playjumpsound();
                state2 = "jump";
                delay2 = 0;
                k2 = 0;
            }
        }

    });

});