 var user_code;
 var maxNum=99999;
 var minNum=10000;
 var count=0;
 $(function(){
    //隨機驗證碼
    user_code=Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    
                
 });
 
$(document).ready(function(){
            //網頁顯示驗證碼
                    $(".code").html(user_code);           
               
    function doAjax(){
         $.ajax({
                url:"one_back.php",
                data:{user_code},
                type:"POST",

                success: function(data)     //讀成功
                {
                    
                    if(data == 3){  
                        window.location.replace("http://140.136.54.242/GAME_1217/ready.html");    //goto ready畫面
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


    

