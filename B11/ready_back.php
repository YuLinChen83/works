<?php
    session_start();
        

        include_once("configure.php");          //嵌入另外寫的資料庫程式
        include_once("connect_db.php");         //嵌入另外寫的資料庫程式

        $player_sql = "SELECT pt_playerno FROM tbl_player WHERE dt_verify = $_SESSION[usercode]";
        $p_result = mysql_query($player_sql,$link)or die("Error in Selecting " . mysqli_error($player_sql));
        $row=mysql_fetch_array($p_result);

        //判斷手機是否遊戲開始
        if($row["pt_playerno"] == 4){   //單人
            $sql = "SELECT dt_player ,dt_name ,pt_start FROM B11.tbl_player WHERE dt_verify = $_SESSION[usercode] ORDER BY pt_id desc LIMIT 1";
            $result = mysql_query($sql,$link)or die("Error in Selecting " . mysqli_error($sql));
            $array_user = array();
            while($obj = mysql_fetch_assoc($result)){
                $array_user[] = $obj;
            }
        //pt_end改成0 防止手機一直進入gameover畫面
            $sql_0 = "UPDATE B11.tbl_coin SET ct_end = '0' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode])";
            $result_0 = mysql_query($sql_0,$link)or die("Error in Selecting " . mysqli_error($sql_0));

        }else if($row["pt_playerno"] == 5){     //雙人
            //$sql_1 = "SELECT dt_player, dt_name ,pt_start FROM B11.tbl_player WHERE dt_verify = $_SESSION[usercode] ORDER BY pt_id LIMIT 2";
            $sql_1 = "SELECT dt_player, dt_name ,pt_start FROM B11.tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1' ORDER BY pt_id LIMIT 1";
            $sql_2 = "SELECT dt_player, dt_name ,pt_start FROM B11.tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='2' ORDER BY pt_id LIMIT 1";
            $result_1 = mysql_query($sql_1,$link)or die("Error in Selecting " . mysqli_error($sql_1));
            $result_2 = mysql_query($sql_2,$link)or die("Error in Selecting " . mysqli_error($sql_2));
            /*$array_user = array();
            while($obj = mysql_fetch_assoc($result_1)){
                $array_user[] = $obj;
            }*/
            $obj_1 = mysql_fetch_array($result_1);
            $obj_2 = mysql_fetch_array($result_2);
            $array_user = array(array('dt_player'=>$obj_1["dt_player"],'dt_name'=>$obj_1["dt_name"],'pt_start'=>$obj_1["pt_start"]),array('dt_player'=>$obj_2["dt_player"],'dt_name'=>$obj_2["dt_name"],'pt_start'=>$obj_2["pt_start"]));

        //pt_end改成0 防止手機一直進入gameover畫面
            $sql1_0 = "UPDATE B11.tbl_coin SET ct_end = '0' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player = '1')";
            $result1_0 = mysql_query($sql1_0,$link)or die("Error in Selecting " . mysqli_error($sql1_0));
            $sql2_0 = "UPDATE B11.tbl_coin SET ct_end = '0' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player = '2')";
            $result2_0 = mysql_query($sql2_0,$link)or die("Error in Selecting " . mysqli_error($sql2_0));
        }

        
        

        echo json_encode($array_user);
        //$row=mysql_fetch_array($result_1);
        //echo $_SESSION['usercode'];

        //釋放查詢結果所佔用的記憶體
        mysql_free_result($result);
        mysql_free_result($result_0);
        mysql_free_result($result1_0);
        mysql_free_result($result2_0);
        mysql_free_result($result_1);

        //關閉資料庫
        mysql_close($result);
        mysql_close($result_0);
        mysql_close($result1_0);
        mysql_close($result2_0);
        mysql_close($result_1); 


        
?>