var count=0;
$(document).ready(function(){
    function doAjax(){
         $.ajax({
                url:"ready_back.php",
                type:"POST",

                success: function(data)     //讀成功
                {
                    var aaa = eval(data);
                    if(aaa[0].dt_player == 3){
                        $("#p2").hide();
                        $(".one").css("left", "35%");
                        $("#player1").html("Player1");    //顯示player幾
                        $("#name1").html(aaa[0].dt_name); //顯示玩家名稱
                    }else if(aaa[0].dt_player == 1){
                        $("#player1").html("Player1"); 
                        $("#name1").html(aaa[0].dt_name);
                            if(aaa[1].dt_player == 2){
                                $("#player2").html("Player2"); 
                                $("#name2").html(aaa[1].dt_name);
                            }
                    }
                    

                    if(aaa[0].dt_player == 3 && aaa[0].pt_start == 2){  //開始遊戲
                        window.location.replace("http://140.136.54.242/GAME_1217/game.html");    //goto 遊戲畫面(單人)
                        count++;
                    }else if(aaa[0].pt_start == 2 && aaa[1].pt_start == 2){  //開始遊戲
                        window.location.replace("http://140.136.54.242/GAME_1217/game_2.html");    //goto 遊戲畫面(雙人)
                        count++;
                    }else if(count == 0){
                        setTimeout(doAjax, 200);
                    }
                },
                error: function(xhr,textStatus,err)     //顯示錯誤
                {
                    console.log("readyState: " + xhr.readyState);
                    console.log("responseText: "+ xhr.responseText);
                    console.log("status: " + xhr.status);
                    console.log("text status: " + textStatus);
                    console.log("error: " + err);
                }
            });

    }
    doAjax();



});      