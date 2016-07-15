var coinMax = 0;
var coinMax2 = 0;
var spend_speed = 0;
var spend_reborn = 0;
var spend_reverse = 0;
var spend_anesthetize = 0;
var spend_speed2 = 0;
var spend_reborn2 = 0;
var spend_reverse2 = 0;
var spend_anesthetize2 = 0;
var end_player;
var end_result;
var end_count = 0;


function drawScene() { // main drawScene function
    if (soundcheckbox.checked) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
    /* Player1 */
    if (ken1.x > 0 && player1 == null) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
        if (isStart == false) {
            iPillarSpeed = 0;
        } else {
            iPillarSpeed = 2;
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
            ctx.drawImage(backgroundImage, 0 + iBgShiftX, 0, 1300, 500, 0, 0, 1300, 500);

            ctx.globalAlpha = sunsetAlpha;
            ctx.drawImage(backgroundImage2, 0 + iBgShiftX, 0, 1300, 500, 0, 0, 1300, 500);
        }
        if (woodOK > 9 && bgAlpha >= 0) { //woodOK:從要擺第幾木板開始切場景
            bgAlpha -= 0.02;
            sunsetAlpha += 0.02;
        }
        ctx.globalAlpha = 1;

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
                            coinMax = coinsPoint * 100 - spend_speed * 1000 - spend_reborn * 2000 - spend_reverse * 2000 - spend_anesthetize * 1000;
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

                        ctx.font = "20px Arial";
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 5;
                        ctx.strokeText("Player1 挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);
                        ctx.fillStyle = "black";
                        ctx.fillText("Player1 挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);


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
                        ctx.font = "20px Arial";
                        ctx.strokeStyle = "white";
                        ctx.lineWidth = 5;
                        ctx.strokeText("Player1 挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);
                        ctx.fillStyle = "black";
                        ctx.fillText("Player1 挑戰第 " + (woodOK + 1) + " 個木板擺放！", 40, 50);
                        for (var i = coins.length - 1; i >= 0; i--) {
                            if (coins[i].isTouch == true) {
                                coinsPoint++;
                            }
                        };
                        if ((coinsPoint * 100) > coinMax) {
                            coinMax = coinsPoint * 100 - spend_speed * 1000 - spend_reborn * 2000 - spend_reverse * 2000 - spend_anesthetize * 1000;

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
                    if (ken1.x + ken1.w - 10 > coins[pkey].x && ken1.x < coins[pkey].x + coins[pkey].w - 10) {
                        if (coins[pkey].y + coins[pkey].h > ken1.y && coins[pkey].y < ken1.y + ken1.h) { //10:誤差範圍
                            coinsound();
                            coins[pkey].isTouch = true;
                            coins[pkey].x -= 1300;
                        }
                    }
                    if (coins[pkey].isTouch == true) {} else {
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
                //吃硬幣判斷
                if (toolsReverse[pkey] != undefined) {
                    if (ken1.x + ken1.w - 15 > toolsReverse[pkey].x && ken1.x < toolsReverse[pkey].x + toolsReverse[pkey].w - 15 ){
                        if (toolsReverse[pkey].y + toolsReverse[pkey].h > ken1.y && toolsReverse[pkey].y < ken1.y + ken1.h) { //10:誤差範圍
                            playreversesound();
                            toolsReverse[pkey].isTouch = true;
                            toolsReverse[pkey].x += -1300;
                            reverseTime = 800;
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
                    if (ken1.x + ken1.w - 15 > toolsAnesthetize[pkey].x && ken1.x < toolsAnesthetize[pkey].x + toolsAnesthetize[pkey].w - 15) {
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
    } else {
        audioElement.volume = 0;
        if (player2 == null) {
            player1 = true; //player1 lose
            player2 = false;
        }
        if (player1 == true) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
            ctx.font = "100px Georgia";
            ctx.fillStyle = "white";
            ctx.fillText("You lose :(", ctx.canvas.width / 2 - 250, ctx.canvas.height / 2 - 10);
            ctx.font = "30px Georgia";
            ctx.fillText("Your record: 過 " + woodOK + " 根險峻的柱子", ctx.canvas.width / 2 - 200, ctx.canvas.height / 2 + 50);

            ctx.font = "20px Arial";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText("Player1", 40, 50);
            ctx.fillStyle = "black";
            ctx.fillText("Player1", 40, 50);

            end_player = 1;
            end_result = 2;
            doEndAjax();
        } else if (player2 == true) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas
            ctx.font = "100px Georgia";
            ctx.fillStyle = "white";
            ctx.fillText("You win :)", ctx.canvas.width / 2 - 250, ctx.canvas.height / 2 - 10);
            ctx.font = "30px Georgia";
            ctx.fillText("Your record: 過 " + woodOK + " 根險峻的柱子", ctx.canvas.width / 2 - 200, ctx.canvas.height / 2 + 50);

            ctx.font = "20px Arial";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 5;
            ctx.strokeText("Player1", 40, 50);
            ctx.fillStyle = "black";
            ctx.fillText("Player1", 40, 50);

            end_player = 1;
            end_result = 1;
            doEndAjax();
        }
        end_count++;
    }

    /* Player2 */
    if (ken2.x > 0 && player1 == null) {
        ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height); // clear canvas
        if (isStart2 == false) {
            iPillarSpeed2 = 0;
        } else {
            iPillarSpeed2 = 2;
        }

        /* draw background start */
        iBgShiftX2 += iPillarSpeed2;
        if (iBgShiftX2 > 2328) {
            iBgShiftX2 = 0;
            iBgShiftX_2_2 = 0;
        }
        if (iBgShiftX2 >= 1026) {
            iBgShiftX_2_2 += iPillarSpeed2;
            ctx2.globalAlpha = bgAlpha2;
            ctx2.drawImage(backgroundImage, iBgShiftX2, 0, 2328 - iBgShiftX2, 500, 0, 0, 2328 - iBgShiftX2, 500);
            ctx2.drawImage(backgroundImage, 0, 0, iBgShiftX_2_2, 500, 1300 - iBgShiftX_2_2, 0, iBgShiftX_2_2, 500);

            ctx2.globalAlpha = sunsetAlpha2;
            ctx2.drawImage(backgroundImage2, iBgShiftX2, 0, 2328 - iBgShiftX2, 500, 0, 0, 2328 - iBgShiftX2, 500);
            ctx2.drawImage(backgroundImage2, 0, 0, iBgShiftX_2_2, 500, 1300 - iBgShiftX_2_2, 0, iBgShiftX_2_2, 500);

        } else {
            ctx2.globalAlpha = bgAlpha2;
            ctx2.drawImage(backgroundImage, iBgShiftX2, 0, 1300, 500, 0, 0, 1300, 500);

            ctx2.globalAlpha = sunsetAlpha2;
            ctx2.drawImage(backgroundImage2, iBgShiftX2, 0, 1300, 500, 0, 0, 1300, 500);
        }
        if (woodOK2 > 9 && bgAlpha2 >= 0) { //woodOK:從要擺第幾木板開始切場景
            bgAlpha2 -= 0.02;
            sunsetAlpha2 += 0.02;
        }
        ctx2.globalAlpha = 1;
        /* draw background end */


        //generate Pillars 位置
        if (pillars2.length > 0) {
            for (var pkey2 in pillars2) {
                if (pillars2[pkey2] != undefined) {

                    //人物柱子上
                    if (pillars2[pkey2].x <= ken2.x + ken2.w / 2 && ken2.x + ken2.w / 2 <= pillars2[pkey2].x + pillars2[pkey2].w) {
                        isOnWood2 = false;
                        canMove2 = true;
                        kenIndex2 = pkey2;
                        isON2 = true;


                        if (isReborn2 == true && ken2.x < 3) {
                            reborn2();
                            isReborn2 = false;
                        }
                        for (var i = coins2.length - 1; i >= 0; i--) {
                            if (coins2[i].isTouch == true) {
                                coinsPoint2++;
                            }
                        };
                        //判斷吃的硬幣數
                        if ((coinsPoint2 * 100) > coinMax2) {
                            coinMax2 = coinsPoint2 * 100 - spend_speed2 * 1000 - spend_reborn2 * 2000 - spend_reverse2 * 2000 - spend_anesthetize2 * 1000;
                            if (coinMax2 < 0) {
                                coinMax2 = 0;
                            }
                        }
                        ctx2.font = "30px Georgia";
                        ctx2.strokeStyle = "white";
                        ctx2.lineWidth = 5;
                        ctx2.strokeText("Money: " + coinMax2, 1000, 50);
                        ctx2.fillStyle = "black";
                        ctx2.fillText("Money: " + coinMax2, 1000, 50);
                        coinsPoint2 = 0;

                        for (var j = 0; j < pillars2.length; j++) {
                            if (isOK_2_2[j] == true) {
                                drawCorrectWood2(pillars2[j].x + pillars2[j].w + iPillarSpeed2, pillars2[j].y, woodsW2[j], pillars2[j].nextD, isH[j]);
                            } else {
                                drawWood2(pillars2[woodOK2].x + pillars2[woodOK2].w, pillars2[woodOK2].y, woodsW2[woodOK2], pillars2[woodOK2].nextD, isH2[woodOK2]);
                            }
                        }

                        //若加速但該木板尚未放置 -> 直接鋪好木板讓他過
                        if (addSpeedCount2 > 0 && isOK_2_2[pkey2] != true) {
                            isOK_2_2[pkey2] = true;
                            woodOK2++;
                        }

                        ctx2.font = "20px Arial";
                        ctx2.strokeStyle = "white";
                        ctx2.lineWidth = 5;
                        ctx2.strokeText("Player2 挑戰第 " + (woodOK2 + 1) + " 個木板擺放！", 40, 50);
                        ctx2.fillStyle = "black";
                        ctx2.fillText("Player2 挑戰第 " + (woodOK2 + 1) + " 個木板擺放！", 40, 50);


                        //到柱子右邊停住                        
                        if (ken2.x + ken2.w < pillars2[pkey2].x + pillars2[pkey2].w && ken2.x > pillars2[pkey2].x + pillars2[pkey2].w - ken2.w - 8) {
                            if (woodOK2 > kenIndex2) {
                                //若已答正確木板數>現在所在木板 -> 讓他繼續走不要停
                                kenStop2 = false;
                            } else {
                                if (anesthetizeTime2 > 0) {
                                    anesthetize2();
                                }
                                kenStop2 = true;
                                if (state2 != "jump" && state2 != "down") { //校正位置y
                                    ken2.y = pillars2[pkey2].y - 100;
                                }
                            }
                        } else {
                            if (anesthetizeTime2 > 0) {
                                anesthetize2();
                            } else {
                                kenStop2 = false;
                            }
                        }

                    } else if (pkey2 == kenIndex2 && isON2 == true) { //人物木板上
                        //站上去印正確長度
                        canMove2 = false;
                        isOnWood2 = true;
                        whichwood2 = pkey2;
                        kenStop2 = false;
                        isOK_2 = false;

                        if (isReborn2 == true && ken2.x < 3) {
                            reborn2();
                            isReborn2 = false;
                        }

                        //若加速但該木板尚未放置 -> 直接鋪好木板讓他過
                        if (addSpeedCount2 > 0 && isOK_2_2[pkey2] != true) {
                            isOK_2_2[pkey2] = true;
                            woodOK2++;
                        }

                        ctx2.font = "20px Arial";
                        ctx2.strokeStyle = "white";
                        ctx2.lineWidth = 5;
                        ctx2.strokeText("Player2 挑戰第 " + (woodOK2 + 1) + " 個木板擺放！", 40, 50);
                        ctx2.fillStyle = "black";
                        ctx2.fillText("Player2 挑戰第 " + (woodOK2 + 1) + " 個木板擺放！", 40, 50);

                        for (var i = coins2.length - 1; i >= 0; i--) {
                            if (coins2[i].isTouch == true) {
                                coinsPoint2++;
                            }
                        };
                        if ((coinsPoint2 * 100) > coinMax2) {
                            coinMax2 = coinsPoint2 * 100 - spend_speed2 * 1000 - spend_reborn2 * 2000 - spend_reverse2 * 2000 - spend_anesthetize2 * 1000;
                            if (coinMax2 < 0) {
                                coinMax2 = 0;
                            }
                        }
                        ctx2.font = "30px Georgia";
                        ctx2.strokeStyle = "white";
                        ctx2.lineWidth = 5;
                        ctx2.strokeText("Money: " + coinMax2, 1000, 50);
                        ctx2.fillStyle = "black";
                        ctx2.fillText("Money: " + coinMax2, 1000, 50);
                        coinsPoint2 = 0;

                        //站木板上斜著走(y變)
                        if (pkey2 < pNum2 - 1 && isON2 == true) {
                            ken2.y += woodsdy2[pkey2];

                            if (kenIndex2 == pNum2 - 1) {
                                isON2 = false;
                            }
                        }

                        for (var j = 0; j < pillars2.length; j++) {
                            if (isOK_2_2[j] == true) {
                                drawCorrectWood2(pillars2[j].x + pillars2[j].w + iPillarSpeed2, pillars2[j].y, woodsW2[j], pillars2[j].nextD, isH2[j]);
                            } else {
                                drawWood2(pillars2[woodOK2].x + pillars2[woodOK2].w, pillars2[woodOK2].y, woodsW2[woodOK2], pillars2[woodOK2].nextD, isH2[woodOK2]);
                            }
                        }
                        isOnWood2 = true;
                    }

                    ctx2.drawImage(pillars2[pkey2].image, 0, 0, pillars2[pkey2].w, pillars2[pkey2].h, pillars2[pkey2].x, pillars2[pkey2].y, pillars2[pkey2].w, pillars2[pkey2].h);
                    if (isStart2 == false) {} else {
                        pillars2[pkey2].x += pillars2[pkey2].speed;
                    }
                }
            }

        }
        if (kenStop2 == true && (state2 == "walk" || state2 == "stop")) {
            state2 = "stop";
            ken2.x -= iPillarSpeed2;
        } else if (kenStop2 == true && state2 == "jump") {
            ken2.x -= iPillarSpeed2;

        } else if (kenStop2 == true && state2 == "down") {
            ken2.x -= iPillarSpeed2;

        } else if (state2 != "jump" && state2 != "down") {
            state2 = "walk";
        }

        //金幣
        if (coins2.length > 0) {
            for (var pkey2 in coins2) {
                //吃硬幣判斷
                if (coins2[pkey2] != undefined) {
                    if (ken2.x + ken2.w - 10 > coins2[pkey2].x && ken2.x < coins2[pkey2].x + coins2[pkey2].w - 10) {
                        if (coins2[pkey2].y + coins2[pkey2].h > ken2.y && coins2[pkey2].y < ken2.y + ken2.h) { //10:誤差範圍
                            coinsound();
                            coins2[pkey2].isTouch = true;
                            coins2[pkey2].x -= 1300;
                        }
                    }
                    if (coins2[pkey2].isTouch == true) {} else {
                        ctx2.drawImage(coins2[pkey2].image, coinAni2, 0, 16, 16, coins2[pkey2].x, coins2[pkey2].y, 16, 16);
                        coins2[pkey2].x += -iPillarSpeed2;
                        coinCount2++;
                        if (coinCount2 == 800) {
                            coinCount2 = 0;
                            coinAni2 += 16;
                            if (coinAni2 >= 192) {
                                coinAni2 = 0;
                            }
                        }
                    }
                }
            }
        }

        //反轉道具
        if (toolsReverse2.length > 0) {
            for (var pkey2 in toolsReverse2) {
                //吃硬幣判斷
                if (toolsReverse2[pkey2] != undefined) {
                    if (ken2.x + ken2.w - 15> toolsReverse2[pkey2].x && ken2.x < toolsReverse2[pkey2].x + toolsReverse2[pkey2].w-15) {
                        if (toolsReverse2[pkey2].y + toolsReverse2[pkey2].h > ken2.y && toolsReverse2[pkey2].y < ken2.y + ken2.h) { //10:誤差範圍
                            playreversesound();
                            toolsReverse2[pkey2].isTouch = true;
                            toolsReverse2[pkey2].x += -1300;
                            reverseTime2 = 800;
                        }
                    }
                    if (toolsReverse2[pkey2].isTouch == true) {
                        toolsReverse2[pkey2].x += -iPillarSpeed2;
                    } else {
                        ctx2.drawImage(toolsReverse2[pkey2].image, toolReverseAnimate2, 252, 34, 45, toolsReverse2[pkey2].x, toolsReverse2[pkey2].y, 34, 45);
                        toolsReverse2[pkey2].x += -iPillarSpeed2;
                        toolReverseCount2++;
                        if (toolReverseCount2 == 150) {
                            toolReverseCount2 = 0;
                            toolReverseAnimate2 += 34;
                            if (toolReverseAnimate2 >= 142) {
                                toolReverseAnimate2 = 6;
                            }
                        }
                    }
                }
            }
        }
        //電池沒電麻痺道具
        if (toolsAnesthetize2.length > 0) {
            for (var pkey2 in toolsAnesthetize2) {
                if (toolsAnesthetize2[pkey2] != undefined) {
                    if (ken2.x + ken2.w -15> toolsAnesthetize2[pkey2].x && ken2.x < toolsAnesthetize2[pkey2].x + toolsAnesthetize2[pkey2].w-15) {
                        if (toolsAnesthetize2[pkey2].y + toolsAnesthetize2[pkey2].h > ken2.y && toolsAnesthetize2[pkey2].y < ken2.y + ken2.h) { //10:誤差範圍
                            playanesthetizesound();
                            toolsAnesthetize2[pkey2].isTouch = true;
                            toolsAnesthetize2[pkey2].x += -1300;
                            anesthetizeTime2 = 50;
                        }
                    }
                    if (toolsAnesthetize2[pkey2].isTouch == true) {
                        toolsAnesthetize2[pkey2].x += -iPillarSpeed2;
                    } else {
                        ctx2.drawImage(toolsAnesthetize2[pkey2].image, toolAnesthetizeAnimate2, 306, 34, 45, toolsAnesthetize2[pkey2].x, toolsAnesthetize2[pkey2].y, 34, 45);
                        toolsAnesthetize2[pkey2].x += -iPillarSpeed2;
                        toolAnesthetizeCount2++;
                        if (toolAnesthetizeCount2 == 150) {
                            toolAnesthetizeCount2 = 0;
                            toolAnesthetizeAnimate2 += 34;
                            if (toolAnesthetizeAnimate2 >= 142) {
                                toolAnesthetizeAnimate2 = 6;
                            }
                        }
                    }
                }
            }
        }

        //draw man state
        if (state2 == "walk") {
            drawKen2();
        } else if (state2 == "jump") {
            drawJump2();
        } else if (state2 == "down") {
            drawDown2();
        } else if (state2 == "stop") {
            drawStop2();
        } else if (state2 == "jumpStop") {

        } else if (state2 == "downStop") {

        }
        if (addSpeedCount2 > 0) {
            addSpeed2();
        }
        if (reverseTime2 > 0) {
            ctx2.font = "30px Georgia";
            ctx2.strokeStyle = "white";
            ctx2.lineWidth = 5;
            ctx2.strokeText("注意!木板反向中", ctx2.canvas.width / 2 - 300, 50);
            ctx2.fillStyle = "#FF0000";
            ctx2.fillText("注意!木板反向中", ctx2.canvas.width / 2 - 300, 50);

            reverse2();
        } else {
            WoodR2 = 1;
        }
        if (RebornCount2 > 0) {
            RebornCount2--;
            ctx2.font = "30px Georgia";
            ctx2.strokeStyle = "#000000";
            ctx2.lineWidth = 5;
            ctx2.strokeText("獲得下一次復活機會✶", ctx2.canvas.width / 2 - 300, 50);
            ctx2.fillStyle = "#FFE4B5";
            ctx2.fillText("獲得下一次復活機會✶", ctx2.canvas.width / 2 - 300, 50);
        }

        if (startTime2 == 0) {

        } else {
            ctx2.font = "100px Georgia";
            ctx2.strokeStyle = "black";
            ctx2.lineWidth = 5;
            ctx2.strokeText("倒數" + startTime2, ctx2.canvas.width / 2 - 130, ctx2.canvas.height / 2 + 30);
            ctx2.fillStyle = "white";
            ctx2.fillText("倒數" + startTime2, ctx2.canvas.width / 2 - 130, ctx2.canvas.height / 2 + 30);
        }

        /*ctx2.font = "40px Georgia";
        ctx2.strokeStyle = "white";
        ctx2.lineWidth = 5;
        ctx2.strokeText("♥ × " + life2, 30, ctx2.canvas.height - 30);
        ctx2.fillStyle = "#FF0000";
        ctx2.fillText("♥ × " + life2, 30, ctx2.canvas.height - 30);*/
    } else {
        audioElement.volume = 0;
        if (player1 == null) {
            player2 = true; //player2 lose
            player1 = false;
        }
        if (player2 == true) {
            audioElement.volume = 0;
            ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height); // clear canvas
            ctx2.font = "100px Georgia";
            ctx2.fillStyle = "white";
            ctx2.fillText("you lose :(", ctx2.canvas.width / 2 - 250, ctx2.canvas.height / 2 - 10);
            ctx2.font = "30px Georgia";
            ctx2.fillText("Your record: 過 " + woodOK2 + " 根險峻的柱子", ctx2.canvas.width / 2 - 200, ctx2.canvas.height / 2 + 50);

            ctx2.font = "20px Arial";
            ctx2.strokeStyle = "white";
            ctx2.lineWidth = 5;
            ctx2.strokeText("Player2", 40, 50);
            ctx2.fillStyle = "black";
            ctx2.fillText("Player2", 40, 50);

            end_player = 2;
            end_result = 2;
            doEndAjax();
        } else if (player1 == true) {
            ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height); // clear canvas
            ctx2.font = "100px Georgia";
            ctx2.fillStyle = "white";
            ctx2.fillText("You win :)", ctx2.canvas.width / 2 - 250, ctx2.canvas.height / 2 - 10);
            ctx2.font = "30px Georgia";
            ctx2.fillText("Your record: 過 " + woodOK2 + " 根險峻的柱子", ctx2.canvas.width / 2 - 200, ctx2.canvas.height / 2 + 50);

            ctx2.font = "20px Arial";
            ctx2.strokeStyle = "white";
            ctx2.lineWidth = 5;
            ctx2.strokeText("Player2", 40, 50);
            ctx2.fillStyle = "black";
            ctx2.fillText("Player2", 40, 50);

            end_player = 2;
            end_result = 1;
            doEndAjax();
        }
        end_count++;
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

    ctx.drawImage(SpriteImage, 0 + k, 0, ken1.w, ken1.h, ken1.x, ken1.y, ken1.w, ken1.h);
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
    kenDelayTime = 10;
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
    kenDelayTime = 10;
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

var coinsNums;
var pH = false;

function addPillar() {

    //clearInterval(pTimer);
    for (var i = 0; i < pNum; i++) { //i:柱子預設個數
        pH = false;

        if (i == 0) {
            rPillarH = getRand(10, 100);
            rPillarW = 350;
        } else {
            rPillarW = getRand(100, 250);
        }
        while (i > 0 && pH == false) {
            rPillarH = getRand(10, 150);
            if (Math.abs(pillars[i - 1].h - rPillarH) > 100 || Math.abs(pillars[i - 1].h - rPillarH) < 10) {} else {
                pH = true;
            }
        }
        dis = getRand(80, 200);
        pillars.push(new Pillar(nowWidth, canvas.height - rPillarH, rPillarW, rPillarH, -iPillarSpeed, oPillarImage, dis));
        pillars2.push(new Pillar(nowWidth, canvas.height - rPillarH, rPillarW, rPillarH, -iPillarSpeed, oPillarImage, dis));

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
                if (Math.random() * 20 > 1) {
                    coinPosition = 200;
                    if (canvas.height - rPillarH - coinPosition < 50) {
                        coinPosition = 20;
                    }
                    if (Math.random() * 30 > 1) { //硬幣出線機率越大越高
                        coins.push(new coin(nowWidth + j * 32, canvas.height - rPillarH - coinPosition, 16, 16, CoinImage, false));
                        coins2.push(new coin(nowWidth + j * 32, canvas.height - rPillarH - coinPosition, 16, 16, CoinImage, false));

                    } else {
                        if (Math.random() * 2 > 1) {
                            toolsReverse.push(new ToolReverse(nowWidth + j * 32, canvas.height - rPillarH - coinPosition - 30, 35, 45, SpriteImage, false));
                            toolsReverse2.push(new ToolReverse(nowWidth + j * 32, canvas.height - rPillarH - coinPosition - 30, 35, 45, SpriteImage, false));

                        } else {
                            toolsAnesthetize.push(new ToolAnesthetize(nowWidth + j * 32, canvas.height - rPillarH - coinPosition - 30, 35, 45, SpriteImage, false));
                            toolsAnesthetize2.push(new ToolAnesthetize(nowWidth + j * 32, canvas.height - rPillarH - coinPosition - 30, 35, 45, SpriteImage, false));

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
            isH2[i] = "high";
        } else {
            isH[i] = "short";
            isH2[i] = "short";
        }
        woodsW[i] = Math.sqrt(Math.pow(this.pillars[i + 1].y - this.pillars[i].y, 2) + Math.pow(this.pillars[i].nextD, 2));
        woodsW2[i] = Math.sqrt(Math.pow(this.pillars[i + 1].y - this.pillars[i].y, 2) + Math.pow(this.pillars[i].nextD, 2));

    }

    //求每個木板的dy
    for (var i = 0; i < pNum; i++) {
        if (i < pNum - 1) {
            woodsdy[i] = (pillars[i * 1 + 1].y - pillars[i * 1].y) * iPillarSpeed / pillars[i].nextD;
            woodsdy2[i] = (pillars[i * 1 + 1].y - pillars[i * 1].y) * iPillarSpeed / pillars[i].nextD;

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
        data: {
            'end_player': end_player,
            'end_result': end_result
        },
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

//使用者畫木板
//$(document).ready(function() {
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
doDrawAjax();

function doToolAjax() {
    $.ajax({
        type: "POST",
        url: "json_tool.php",

        success: function(data) //讀JSON成功
            {

                var tool = eval(data);
                if (tool[0].dt_jump == 1) { //手機按jump
                    if (state == "walk" && addSpeedCount == 0) {
                        state = "jump";
                        delay = 0;
                        k = 0;
                    }
                }
                if (tool[0].dt_ok == 1) { //手機按ok
                    if (wood_correct_rotate == wood_rotate) {
                        isOK = true;
                        isOK2[woodOK] = true;
                        woodOK++;
                        kenStop = false;
                        reverseTime = 0;
                    } else {
                        //life--;
                    }

                }
                if (tool[0].dt_tool1 == 1 && (state == "walk" || state == "stop")) { //加速
                    addSpeedCount = 40;
                    spend_speed++;
                } else if (tool[0].dt_tool2 == 1) { //復活
                    isReborn = true;
                    RebornCount = 40;
                    spend_reborn++;
                } else if (tool[0].dt_tool3 == 1) { //陷害player2反轉
                    playreversesound();
                    reverseTime2 = 800;
                    spend_reverse++;
                } else if (tool[0].dt_tool4 == 1) { //陷害player2痲痹
                    playanesthetizesound();
                    anesthetizeTime2 = 50;
                    spend_anesthetize++;
                }
                if (end_count == 0) {
                    setTimeout(doToolAjax, 200);
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
doToolAjax();

function doCoinAjax() {
    $.ajax({
        url: "insert_coin.php",
        data: {
            'coinMax': coinMax,
            'coinMax2': coinMax2
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
        ken2 = new ken(650, pillars[0].y - 100, 71, 100, kenImage); //103有點高過柱子所以改100

    }
    kenImage.onerror = function() {
        console.log('Error loading the ken image.');
    }


    $(window).keydown(function(evt) { // onkeydown event handle
        var pk = pressedKeys[evt.keyCode];
        if (!pk) {
            pressedKeys[evt.keyCode] = 1; // add all pressed keys into array
        }

        if (evt.keyCode == 83 && (state == "walk" || state == "stop")) { //加速前進一小段距離
            addSpeedCount = 40;
        }

        if (evt.keyCode == 82) { //'R'
            isReborn = true;
            RebornCount = 40;
        }
        if (evt.keyCode == 90) { //'Z'
            playreversesound();
            reverseTime2 = 800;
        }

        if (evt.keyCode == 88) { //'X'
            playanesthetizesound();
            anesthetizeTime2 = 50;
        }

    });

    $(window).keyup(function(evt) { // onkeyup event handle
        var pk = pressedKeys[evt.keyCode];
        if (pk) {
            delete pressedKeys[evt.keyCode]; // remove pressed key from array
        }
        if (evt.keyCode == 65) { // 'A' button jump
            if (state == "walk" && addSpeedCount == 0) {
                playjumpsound();
                state = "jump";
                delay = 0;
                k = 0;
            }
        }

    });

});