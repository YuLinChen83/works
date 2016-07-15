
$(document).ready(function(){
var count=0;

    function doAjax(){
         $.ajax({
                url:"home_back.php",
                type:"POST",

                success: function(data)     //讀成功
                {              

                    var aaa = eval(data);        
                    if(aaa[0].pt_start==1){
                        if(aaa[0].pt_playerno == 4){ //單人手機傳值4
                        window.location.replace("http://140.136.54.242/GAME_1217/one_code.html");    //goto單人驗證碼
                        count++;
                        
                    }else if(aaa[0].pt_playerno == 5){ //雙人手機傳值5
                        window.location.replace("http://140.136.54.242/GAME_1217/two_code.html");    //goto雙人驗證碼
                        
                    }
                    
                    }
                    if(count==0){
                        setTimeout(doAjax, 100);    //沒收到手機傳值就一直更新
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


