var backgroundImage;
var oPillarImage;
var canvas, ctx;
var iBgShiftX = 0;
var iBgShiftX_2 = 2;
var pillars = [];
var pTimer;
var iPillarW = 128;
var iPillarH = 128;
var iPillarSpeed = 3; // initial speed
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
var coinMax = 0;
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
var spend_speed = 0;
var spend_reborn = 0;
var bgAlpha = 1;
var sunsetAlpha = 0;
var rWood;
var count = 0;
var win1_name;
var win1_woods;
var win2_name;
var win2_woods;
var win3_name;
var win3_woods;

/* sounds */
var audioElement;
var jumpaudio;
var ohaudio;
var reverseaudio;
var coinaudio;
var anesthetizeaudio;



function drawScene() { // main drawScene function
    if (soundcheckbox.checked) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
    if (ken1.x > 0 && life > 0) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
        if (isStart == false) {
            iPillarSpeed = 0;
        } else {
            iPillarSpeed = 3;
        }

        /* draw background start */
        iBgShiftX += iPillarSpeed;
        if (iBgShiftX > 2328) {
            iBgShiftX = 0;
            iBgShiftX_2 = 0;
        }
        if (iBgShiftX >= 1026) {
            iBgShiftX_2 += iPillarSpeed;
            ctx.globalAlpha = bgAlpha;
            ctx.drawImage(backgroundImage, iBgShiftX, 0, 2328 - iBgShiftX, 500, 0, 0, 2328 - iBgShiftX, 500);
            ctx.drawImage(backgroundImage, 0, 0, iBgShiftX_2, 500, 1300 - iBgShiftX_2, 0, iBgShiftX_2, 500);

            ctx.globalAlpha = sunsetAlpha;
            ctx.drawImage(backgroundImage2, iBgShiftX, 0, 2328 - iBgShiftX, 500, 0, 0, 2328 - iBgShiftX, 500);
            ctx.drawImage(backgroundImage2, 0, 0, iBgShiftX_2, 500, 1300 - iBgShiftX_2, 0, iBgShiftX_2, 500);

        } else {
            ctx.globalAlpha = bgAlpha;
            ctx.drawImage(backgroundImage, iBgShiftX, 0, 1300, 500, 0, 0, 1300, 500);

            ctx.globalAlpha = sunsetAlpha;
            ctx.drawImage(backgroundImage2, iBgShiftX, 0, 1300, 500, 0, 0, 1300, 500);
        }
        if (woodOK > 9 && bgAlpha >= 0) { //woodOK:從要擺第幾木板開始切場景
            bgAlpha -= 0.05;
            sunsetAlpha += 0.05;
        }
        ctx.globalAlpha = 1;
        /* draw background end */


        //generate Pillars 位置
        if (pillars.length > 0) {
            for (var pkey in pillars) {
                if (pillars[pkey] != undefined) {

                    //人物柱子上
                    if (pillars[pkey].x <= ken1.x + ken1.w / 2 && ken1.x + ken1.w / 2 <= pillars[pkey].x + pillars[pkey].w) {
                        isOnWood = false;
                        canMove = true;
                        kenIndex = pkey;
                        isON = true;

                        if (isReborn == true && ken1.x < 3) {
                            reborn();
                            isReborn = false;
                        }

                        //判斷吃的硬幣數
                        for (var i = coins.length - 1; i >= 0; i--) {
                            if (coins[i].isTouch == true) {
                                coinsPoint++;
                            }
                        };
                        if ((coinsPoint * 100) > coinMax) {
                            coinMax = coinsPoint * 100 - spend_speed * 1000 - spend_reborn * 2000;
                            if (coinMax < 0) {
                                coinMax = 0;
                            }
                        }
                        ctx.font = "30px Georgia";
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 5;
                        ctx.strokeText("Money: " + coinMax, 1000, 50);
                        ctx.fillStyle = "black";
                        ctx.fillText("Money: " + coinMax, 1000, 50);
                        coinsPoint = 0;

                        //若加速但該木板尚未放置 -> 直接鋪好木板讓他過
                        if (addSpeedCount > 0 && isOK2[pkey] != true) {
                            isOK2[pkey] = true;
                            woodOK++;
                        }

                        for (var j = 0; j < pillars.length; j++) {
                            if (isOK2[j] == true) {
                                drawCorrectWood(pillars[j].x + pillars[j].w + iPillarSpeed, pillars[j].y, woodsW[j], pillars[j].nextD, isH[j]);
                            } else {
                                drawWood(pillars[woodOK].x + pillars[woodOK].w, pillars[woodOK].y, woodsW[woodOK], pillars[woodOK].nextD, isH[woodOK]);
                            }
                        }

                        ctx.font = "20px Georgia";
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 5;
                        ctx.strokeText("挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);
                        ctx.fillStyle = "black";
                        ctx.fillText("挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);

                        //到柱子右邊停住                        
                        if (ken1.x + ken1.w < pillars[pkey].x + pillars[pkey].w && ken1.x > pillars[pkey].x + pillars[pkey].w - ken1.w - 8) {
                            if (woodOK > kenIndex) {
                                //若已答正確木板數>現在所在木板 -> 讓他繼續走不要停
                                kenStop = false;
                            } else {
                                if (anesthetizeTime > 0) {
                                    anesthetize();
                                }
                                kenStop = true;
                                if (state != "jump" && state != "down") { //校正位置y
                                    ken1.y = pillars[pkey].y - 90;
                                }
                            }
                        } else {
                            if (anesthetizeTime > 0) {
                                anesthetize();
                            } else {
                                kenStop = false;
                            }
                        }

                    } else if (pkey == kenIndex && isON == true) { //人物木板上
                        //站上去印正確長度
                        canMove = false;
                        isOnWood = true;
                        whichwood = pkey;
                        kenStop = false;
                        isOK = false;

                        if (isReborn == true && ken1.x < 3) {
                            reborn();
                            isReborn = false;
                        }

                        //若加速但該木板尚未放置 -> 直接鋪好木板讓他過
                        if (addSpeedCount > 0 && isOK2[pkey] != true) {
                            isOK2[pkey] = true;
                            woodOK++;
                        }
                        ctx.font = "20px Georgia";
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 5;
                        ctx.strokeText("挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);
                        ctx.fillStyle = "black";
                        ctx.fillText("挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);
                        for (var i = coins.length - 1; i >= 0; i--) {
                            if (coins[i].isTouch == true) {
                                coinsPoint++;
                            }
                        };
                        if ((coinsPoint * 100) > coinMax) {
                            coinMax = coinsPoint * 100 - spend_speed * 1000 - spend_reborn * 2000;
                            if (coinMax < 0) {
                                coinMax = 0;
                            }
                        }
                        ctx.font = "30px Georgia";
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 5;
                        ctx.strokeText("Money: " + coinMax, 1000, 50);
                        ctx.fillStyle = "black";
                        ctx.fillText("Money: " + coinMax, 1000, 50);
                        coinsPoint = 0;


                        //站木板上斜著走(y變)
                        if (pkey < pNum - 1 && isON == true) {
                            ken1.y += woodsdy[pkey];

                            if (kenIndex == pNum - 1) {
                                isON = false;
                            }
                        }

                        for (var j = 0; j < pillars.length; j++) {
                            if (isOK2[j] == true) {
                                drawCorrectWood(pillars[j].x + pillars[j].w + iPillarSpeed, pillars[j].y, woodsW[j], pillars[j].nextD, isH[j]);
                            } else {
                                drawWood(pillars[woodOK].x + pillars[woodOK].w, pillars[woodOK].y, woodsW[woodOK], pillars[woodOK].nextD, isH[woodOK]);
                            }
                        }
                        isOnWood = true;
                    }

                    ctx.drawImage(pillars[pkey].image, 0, 0, pillars[pkey].w, pillars[pkey].h, pillars[pkey].x, pillars[pkey].y, pillars[pkey].w, pillars[pkey].h);
                    if (isStart == false) {} else {
                        pillars[pkey].x += pillars[pkey].speed;
                    }
                }
            }

        }
        if (kenStop == true && (state == "walk" || state == "stop")) {
            state = "stop";
            ken1.x -= iPillarSpeed;
        } else if (kenStop == true && state == "jump") {
            ken1.x -= iPillarSpeed;

        } else if (kenStop == true && state == "down") {
            ken1.x -= iPillarSpeed;

        } else if (state != "jump" && state != "down") {
            state = "walk";
        }

        //金幣
        if (coins.length > 0) {
            for (var pkey in coins) {
                //吃硬幣判斷
                if (coins[pkey] != undefined) {
                    if (ken1.x + ken1.w > coins[pkey].x && ken1.x < coins[pkey].x + coins[pkey].w) {
                        if (coins[pkey].y + coins[pkey].h + 10 > ken1.y && coins[pkey].y - 10 < ken1.y + ken1.h) { //10:誤差範圍
                            coinsound();
                            coins[pkey].isTouch = true;
                            coins[pkey].x -= 1300;
                        }
                    }
                    if (coins[pkey].isTouch == true) {
                        coins[pkey].x += -iPillarSpeed;
                    } else {
                        ctx.drawImage(coins[pkey].image, coinAni, 0, 16, 16, coins[pkey].x, coins[pkey].y, 16, 16);
                        coins[pkey].x += -iPillarSpeed;
                        coinCount++;
                        if (coinCount == 800) {
                            coinCount = 0;
                            coinAni += 16;
                            if (coinAni >= 192) {
                                coinAni = 0;
                            }
                        }
                    }
                }
            }
        }

        //反轉道具
        if (toolsReverse.length > 0) {
            for (var pkey in toolsReverse) {
                if (toolsReverse[pkey] != undefined) {
                    if (ken1.x + ken1.w + 10 > toolsReverse[pkey].x && ken1.x < toolsReverse[pkey].x + toolsReverse[pkey].w + 10) {
                        if (toolsReverse[pkey].y + toolsReverse[pkey].h > ken1.y && toolsReverse[pkey].y < ken1.y + ken1.h) { //10:誤差範圍
                            playreversesound();
                            toolsReverse[pkey].isTouch = true;
                            toolsReverse[pkey].x += -1300;
                            reverseTime = 300;
                        }
                    }
                    if (toolsReverse[pkey].isTouch == true) {
                        toolsReverse[pkey].x += -iPillarSpeed;
                    } else {
                        ctx.drawImage(toolsReverse[pkey].image, toolReverseAnimate, 252, 34, 45, toolsReverse[pkey].x, toolsReverse[pkey].y, 34, 45);
                        toolsReverse[pkey].x += -iPillarSpeed;
                        toolReverseCount++;
                        if (toolReverseCount == 150) {
                            toolReverseCount = 0;
                            toolReverseAnimate += 34;
                            if (toolReverseAnimate >= 142) {
                                toolReverseAnimate = 6;
                            }
                        }
                    }
                }
            }
        }
        //電池沒電麻痺道具
        if (toolsAnesthetize.length > 0) {
            for (var pkey in toolsAnesthetize) {
                if (toolsAnesthetize[pkey] != undefined) {
                    if (ken1.x + ken1.w + 10 > toolsAnesthetize[pkey].x && ken1.x < toolsAnesthetize[pkey].x + toolsAnesthetize[pkey].w + 10) {
                        if (toolsAnesthetize[pkey].y + toolsAnesthetize[pkey].h > ken1.y && toolsAnesthetize[pkey].y < ken1.y + ken1.h) { //10:誤差範圍
                            playanesthetizesound();
                            toolsAnesthetize[pkey].isTouch = true;
                            toolsAnesthetize[pkey].x += -1300;
                            anesthetizeTime = 50;
                        }
                    }
                    if (toolsAnesthetize[pkey].isTouch == true) {
                        toolsAnesthetize[pkey].x += -iPillarSpeed;
                    } else {
                        ctx.drawImage(toolsAnesthetize[pkey].image, toolAnesthetizeAnimate, 306, 34, 45, toolsAnesthetize[pkey].x, toolsAnesthetize[pkey].y, 34, 45);
                        toolsAnesthetize[pkey].x += -iPillarSpeed;
                        toolAnesthetizeCount++;
                        if (toolAnesthetizeCount == 150) {
                            toolAnesthetizeCount = 0;
                            toolAnesthetizeAnimate += 34;
                            if (toolAnesthetizeAnimate >= 142) {
                                toolAnesthetizeAnimate = 6;
                            }
                        }
                    }
                }
            }
        }

        //draw man state
        if (state == "walk") {
            drawKen();
        } else if (state == "jump") {
            drawJump();
        } else if (state == "down") {
            drawDown();
        } else if (state == "stop") {
            drawStop();
        } else if (state == "jumpStop") {

        } else if (state == "downStop") {

        }
        if (addSpeedCount > 0) {
            addSpeed();
        }
        if (reverseTime > 0) {
            ctx.font = "30px Georgia";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText("注意!木板反向中", ctx.canvas.width / 2 - 300, 50);
            ctx.fillStyle = "#FF0000";
            ctx.fillText("注意!木板反向中", ctx.canvas.width / 2 - 300, 50);

            reverse();
        } else {
            WoodR = 1;
        }
        if (RebornCount > 0) {
            RebornCount--;
            ctx.font = "30px Georgia";
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 5;
            ctx.strokeText("獲得下一次復活機會✶", ctx.canvas.width / 2 - 300, 50);
            ctx.fillStyle = "#FFE4B5";
            ctx.fillText("獲得下一次復活機會✶", ctx.canvas.width / 2 - 300, 50);
        }

        if (startTime == 0) {

        } else {
            ctx.font = "100px Georgia";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 5;
            ctx.strokeText("倒數" + startTime, ctx.canvas.width / 2 - 130, ctx.canvas.height / 2 + 30);
            ctx.fillStyle = "white";
            ctx.fillText("倒數" + startTime, ctx.canvas.width / 2 - 130, ctx.canvas.height / 2 + 30);
        }

        ctx.font = "40px Georgia";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeText("♥ × " + life, 30, ctx.canvas.height - 30);
        ctx.fillStyle = "#FF0000";
        ctx.fillText("♥ × " + life, 30, ctx.canvas.height - 30);
    } else {
        doEndAjax();
        doEndwinAjax();
        if (audioElement.volume > 0) {
            //audioElement.volume -= 0.01;
            audioElement.volume = 0;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
        ctx.font = "100px Georgia";
        ctx.fillStyle = "#FF3333";
        ctx.fillText("Game Over", ctx.canvas.width / 2 - 250, ctx.canvas.height / 2 - 120);
        ctx.font = "30px 黑體-繁";
        ctx.fillStyle = "#000000";
        ctx.fillText("Your record: 過 " + woodOK + " 根險峻的柱子", ctx.canvas.width / 2 - 210, ctx.canvas.height / 2 - 50);
        //排行
        ctx.font = "30px 黑體-繁";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("排行榜", ctx.canvas.width / 2 - 30, ctx.canvas.height / 2 + 20);
        ctx.font = "18px Georgia";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("★ NO.1 " + win1_name, ctx.canvas.width / 2 - 130, ctx.canvas.height / 2 + 50);
        ctx.fillText("Record: " + win1_woods, ctx.canvas.width / 2 + 70, ctx.canvas.height / 2 + 50);
        ctx.fillText("★ NO.2 " + win2_name, ctx.canvas.width / 2 - 130, ctx.canvas.height / 2 + 80);
        ctx.fillText("Record: " + win2_woods, ctx.canvas.width / 2 + 70, ctx.canvas.height / 2 + 80);
        ctx.fillText("★ NO.3 " + win3_name, ctx.canvas.width / 2 - 130, ctx.canvas.height / 2 + 110);
        ctx.fillText("Record: " + win3_woods, ctx.canvas.width / 2 + 70, ctx.canvas.height / 2 + 110);
    }
}

function drawKen() {
    kenDelayTime = 1;
    if (delay > kenDelayTime) {
        k = k + 70;
        if (k > 420) {
            k = 0;
        }
        delay = 0;
    }

    ctx.drawImage(kenImage, 0 + k, 0, ken1.w, ken1.h, ken1.x, ken1.y, ken1.w, ken1.h);
    delay++;
}

function drawStop() {
    kenDelayTime = 3;
    if (delay > kenDelayTime) {
        k = k + 70;
        if (k > 423) {
            k = 0;
        }
        delay = 0;
    }

    ctx.drawImage(SpriteImage, 3 + k, 358, ken1.w, ken1.h, ken1.x, ken1.y + 3, ken1.w, ken1.h);
    delay++;
}

function drawJump() {
    kenDelayTime = 9;
    if (delay > kenDelayTime) {
        k = k + 69;
        delay = 0;
    }
    ken1.y = ken1.y - jumpFar;
    ctx.drawImage(SpriteImage, 3 + k, 560, 69, 111, ken1.x, ken1.y - 15, 69, 111);
    delay++;
    if (k >= 207) {
        //        k = 0;
        state = "down";
        delay = 0;
    }
}

function drawDown() {
    kenDelayTime = 9;
    if (delay > kenDelayTime) {
        k = k + 70;
        delay = 0;
    }
    ken1.y = ken1.y + jumpFar;
    ctx.drawImage(SpriteImage, 3 + k, 560, 69, 111, ken1.x, ken1.y - 15, 69, 111);
    delay++;
    if (k >= 414) {
        state = "walk";
        k = 0;
        delay = 0;
    }
}

function two() {
    startTime = 2;
}

function one() {
    startTime = 1;
}

function zero() {
    startTime = 0;
    isStart = true;
}

function addSpeed() {
    kenDelayTime = 0.5;
    ken1.x += iPillarSpeed * 3;
    if (isOnWood == true) {
        ken1.y += woodsdy[whichwood] * 3;
    }
    if (delay > kenDelayTime) {
        k = k + 70;
        if (k > 420) {
            k = 0;
        }
        delay = 0;
    }
    ctx.font = "30px Georgia";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeText("衝刺～～", ctx.canvas.width / 2 - 200, 50);
    ctx.fillStyle = "darkmagenta";
    ctx.fillText("衝刺～～", ctx.canvas.width / 2 - 200, 50);

    ctx.drawImage(kenImage, 0 + k, 0, ken1.w, ken1.h, ken1.x, ken1.y, ken1.w, ken1.h);
    delay++;
    addSpeedCount--;
}

function reverse() {
    WoodR = -1;
    //reverseTime--;
}

function anesthetize() {
    anesthetizeTime--;
    kenStop = true;
    ctx.font = "30px Georgia";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;
    ctx.strokeText("糟糕～麻痺！", ctx.canvas.width / 2 - 100, 50);
    ctx.fillStyle = "darkmagenta";
    ctx.fillText("糟糕～麻痺！", ctx.canvas.width / 2 - 100, 50);
}

function reborn() {
    state = "walk";
    isOK2[woodOK] = true;
    woodOK++;
    ken1.x = pillars[woodOK].x;
    ken1.y = pillars[woodOK].y - ken1.h;
}

function Pillar(x, y, w, h, speed, image, nextD) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.image = image;
    this.nextD = nextD;
}

function ken(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
}

function coin(x, y, w, h, image, isTouch) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.isTouch = isTouch;
}

function ToolReverse(x, y, w, h, image, isTouch) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.isTouch = isTouch;
}

function ToolAnesthetize(x, y, w, h, image, isTouch) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.image = image;
    this.isTouch = isTouch;
}

function getRand(x, y) {
    return Math.floor(Math.random() * y) + x;
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

var coinsNums;

function addPillar() {

    //clearInterval(pTimer);
    for (var i = 0; i < pNum; i++) { //i:柱子預設個數

        if (i == 0) {
            rPillarW = 500;
        } else {
            rPillarW = getRand(100, 250);
        }
        rPillarH = getRand(30, 300);
        dis = getRand(100, 200);
        pillars.push(new Pillar(nowWidth, canvas.height - rPillarH, rPillarW, rPillarH, -iPillarSpeed, oPillarImage, dis));
        coinsNums = rPillarW / 16 | 0;
        coinsNums = coinsNums / 2;
        if (i > 0) {
            for (var j = 0; j < coinsNums; j++) {
                if (Math.random() * 2 > 1) {
                    coinPosition = 200;
                    if (canvas.height - rPillarH - coinPosition < 50) {
                        coinPosition = 20;
                    }
                } else {
                    coinPosition = 20;
                }
                if (Math.random() * 10 > 1) {
                    if (Math.random() * 30 > 1) {
                        coins.push(new coin(nowWidth + j * 32, canvas.height - rPillarH - coinPosition, 16, 16, CoinImage, false));
                    } else {
                        if (Math.random() * 2 > 1) {
                            toolsReverse.push(new ToolReverse(nowWidth + j * 32, canvas.height - rPillarH - coinPosition - 30, 35, 45, SpriteImage, false));
                        } else {
                            toolsAnesthetize.push(new ToolAnesthetize(nowWidth + j * 32, canvas.height - rPillarH - coinPosition - 30, 35, 45, SpriteImage, false));
                        }
                    }
                }
            }
        }

        nowWidth = nowWidth + dis + rPillarW; //nowWidth:到目前為止經過的距離        
    }

    //因為算的rotate弧度都是正的所以要判斷協哪邊（柱子相對高/低來判斷）
    for (var i = 0; i < pNum - 1; i++) {
        if (this.pillars[i * 1].y > this.pillars[i * 1 + 1].y) {
            isH[i] = "high";
        } else {
            isH[i] = "short";
        }
        woodsW[i] = Math.sqrt(Math.pow(this.pillars[i + 1].y - this.pillars[i].y, 2) + Math.pow(this.pillars[i].nextD, 2));
    }

    //求每個木板的dy
    for (var i = 0; i < pNum; i++) {
        if (i < pNum - 1) {
            woodsdy[i] = (pillars[i * 1 + 1].y - pillars[i * 1].y) * iPillarSpeed / pillars[i].nextD;
        }
    }
}

//畫木板
/*
x: pillars[pkey].x + pillars[pkey].w;
y: pillars[pkey].y;
length: woodsW[pkey];
r: pillars[pkey].nextD;
h: isH[pkey]*/
function drawCorrectWood(x, y, length, r, h) {
    ctx.beginPath();
    ctx.fillStyle = "#8B4513";
    ctx.translate(x, y);
    //因為算的rotate弧度都是正的所以要判斷協哪邊（柱子相對高/低來判斷）
    if (h != "high") {
        ctx.rotate(getRotate(r, length));
        ctx.fillRect(0, 0, length, 8);
        ctx.rotate(-getRotate(r, length));
        ctx.translate(-x, -y);
        ctx.closePath();
    } else {
        ctx.rotate(Math.PI / 180 - getRotate(r, length));
        ctx.fillRect(0, 0, length, 8);
        ctx.rotate(-(Math.PI / 180 - getRotate(r, length)));
        ctx.translate(-x, -y);
        ctx.closePath();
    }
}

//畫木板
function drawWood(x, y, length, r, h) {
    ctx.beginPath();
    ctx.fillStyle = "#FFFF33";
    ctx.translate(x, y);
    ctx.rotate(user_rotate * WoodR);
    ctx.fillRect(0, 0, length, 8);
    ctx.rotate(-user_rotate * WoodR);
    ctx.translate(-x, -y);
    ctx.closePath();
    //記錄使用者角度（用來判斷是否正確
    wood_rotate = user_rotate * 10;
    //記錄正確角度（用來判斷是否正確
    if (h != "high") {
        wood_correct_rotate = Math.round(getRotate(r, length) * 10);
        if (0.5 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < 0.7) {
            wood_correct_rotate1 = Math.floor(getRotate(r, length) * 10);
            //ctx.fillText("range:0.5~0.7", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);
        } else if (0.3 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < 0.5) {
            wood_correct_rotate1 = Math.ceil(getRotate(r, length) * 10);
            //ctx.fillText("range:0.3~0.5", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);

        } else {
            wood_correct_rotate1 = Math.round(getRotate(r, length) * 10);
        }
        if (reverseTime > 0) { //if反轉道具效果產生
            wood_correct_rotate = wood_correct_rotate * (-1);
            wood_correct_rotate1 = wood_correct_rotate1 * (-1);
        }
    } else {
        wood_correct_rotate = -1 * Math.round(getRotate(r, length) * 10);
        if (-0.5 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < -0.7) {
            wood_correct_rotate1 = -1 * Math.ceil(getRotate(r, length) * 10);
            //ctx.fillText("range:-0.5~-0.7", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);
        } else if (-0.3 < ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) && ((getRotate(r, length) * 10) - Math.floor(getRotate(r, length) * 10)) < -0.5) {
            wood_correct_rotate1 = -1 * Math.floor(getRotate(r, length) * 10);
            //ctx.fillText("range:-0.3~-0.5", 30, 120);
            //ctx.fillText("wood_correct_rotate" + wood_correct_rotate , 30, 250);
            //ctx.fillText("wood_correct_rotate1" + wood_correct_rotate1 , 30, 300);
        } else {
            wood_correct_rotate1 = -1 * Math.round(getRotate(r, length) * 10);
        }
        if (reverseTime > 0) { //if反轉道具效果產生
            wood_correct_rotate = wood_correct_rotate * (-1);
            wood_correct_rotate1 = wood_correct_rotate1 * (-1);
        }
    }
}

function getRotate(w, r) {
    return Math.acos(w / r);
}

function doEndAjax() {
    $.ajax({
        url: "end_back.php",
        type: "POST",

        success: function(data) //讀JSON成功
            {
                if (data == 0) { //回選角頁面
                    window.location.replace("http://140.136.54.242/GAME_1217/ready.html"); //goto 遊戲ready畫面
                    count++;
                } else if (data == 3) { //回主畫面
                    window.location.replace("http://140.136.54.242/GAME_1217/index.html"); //goto 主畫面
                    count++;
                } else if (count == 0) {
                    setTimeout(doEndAjax, 500);
                }
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

function doEndwinAjax() {
    $.ajax({
        url: "end_win_back.php",
        data: {
            woodOK
        },
        type: "POST",

        success: function(data) //讀JSON成功
            {
                var aaa = eval(data);
                win1_name = aaa[0].dt_name;
                win1_woods = aaa[0].pt_woods;
                win2_name = aaa[1].dt_name;
                win2_woods = aaa[1].pt_woods;
                win3_name = aaa[2].dt_name;
                win3_woods = aaa[2].pt_woods;

                //setTimeout(doDrawAjax, 200);
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

//使用者畫木板
//$(document).ready(function() {
setTimeout(doDrawAjax, 3000); //delay 3秒

function doDrawAjax() {
    $.ajax({
        type: "POST",
        url: "json_user.php",

        success: function(data) //讀JSON成功
            {

                var aaa = eval(data);
                user_rotate = aaa[0].dt_y / 10;
                setTimeout(doDrawAjax, 200);

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

setTimeout(doToolAjax, 3000); //delay 3秒
function doToolAjax() {
    $.ajax({
        type: "POST",
        url: "json_tool.php",

        success: function(data) //讀JSON成功
            {

                var tool = eval(data);
                if (tool[0].dt_jump == 1 && (state == "walk" && addSpeedCount == 0)) { //手機按jump
                    if (state == "walk") {
                        state = "jump";
                        delay = 0;
                        k = 0;
                    }
                }
                if (tool[0].dt_ok == 1) { //手機按ok
                    if (wood_correct_rotate == wood_rotate || wood_correct_rotate1 == wood_rotate) {
                        isOK = true;
                        isOK2[woodOK] = true;
                        woodOK++;
                        rWood = woodOK;
                        kenStop = false;
                        reverseTime = 0;
                    } else {
                        life--;
                    }

                }
                if (tool[0].dt_tool1 == 1 && (state == "walk" || state == "stop")) { //加速
                    addSpeedCount = 40;
                    spend_speed++;
                } else if (tool[0].dt_tool2 == 1) { //復活
                    isReborn = true;
                    RebornCount = 40;
                    spend_reborn++;
                }
                setTimeout(doToolAjax, 200);

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
//doToolAjax();

function doCoinAjax() {
    $.ajax({
        url: "insert_coin.php",
        data: {
            coinMax
        },
        type: "POST",

        success: function(data) //讀JSON成功
            {
                setTimeout(doCoinAjax, 200);

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
doCoinAjax();

//});



$(function() {
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
    backgroundImage = new Image();
    backgroundImage.src = 'img/bg.png';
    backgroundImage.onload = function() {}
    backgroundImage.onerror = function() {
        console.log('Error loading the background image.');
    }
    backgroundImage2 = new Image();
    backgroundImage2.src = 'img/bg_sunset.png';
    backgroundImage2.onload = function() {}
    backgroundImage2.onerror = function() {
        console.log('Error loading the background image.');
    }
    oPillarImage = new Image();
    oPillarImage.src = 'img/pillar.jpg';
    oPillarImage.onload = function() {}
    oPillarImage.onerror = function() {
        console.log('Error loading the enemy image.');
    }
    CoinImage = new Image();
    CoinImage.src = 'img/coin1.png';
    CoinImage.onload = function() {}
    CoinImage.onerror = function() {
        console.log('Error loading the coin image.');
    }

    SpriteImage = new Image();
    SpriteImage.src = 'img/sprite.png';
    SpriteImage.onload = function() {}
    SpriteImage.onerror = function() {
        console.log('Error loading the sprite image.');
    }

    setTimeout(two, 1000); // 2秒後執行
    setTimeout(one, 1500); // 3
    setTimeout(zero, 3000); // 4
    setInterval(drawScene, 30);
    addPillar();
    init();

    kenImage = new Image();
    kenImage.src = 'img/ken.png';
    kenImage.onload = function() {
        ken1 = new ken(650, pillars[0].y - 90, 70, 90, kenImage);
    }
    kenImage.onerror = function() {
        console.log('Error loading the ken image.');
    }


    $(window).keydown(function(evt) { // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (!pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }
        if (evt.keyCode == 83 && (state == "walk" || state == "stop")) { //'S' 加速前進一小段距離
            addSpeedCount = 40;
        }
        if (evt.keyCode == 82) { //'R' 復活
            isReborn = true;
            RebornCount = 40;
        }
    });

    $(window).keyup(function(evt) {
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode];
        }
        if (evt.keyCode == 65) { // 'A' 跳
            if (state == "walk" && addSpeedCount == 0) {
                playjumpsound();
                state = "jump";
                delay = 0;
                k = 0;
            }
        }

    });

});