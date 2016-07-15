<?php
	session_start();
	$_SESSION['usercode']=$_POST['user_code'];

		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		//傳pt_id到coin表裡
			$coin1_sql = "INSERT INTO tbl_coin (pt_id) SELECT pt_id FROM tbl_player WHERE dt_verify = $_POST[user_code] && dt_player = '0' ORDER BY pt_id LIMIT 1 ";
			$coin1_result =mysql_query($coin1_sql,$link)or die("Error in Selecting " . mysqli_error($coin1_sql));	

		//驗證碼正確的話將dt_player改成1(player1)
			$player1_sql = "UPDATE B11.tbl_player SET dt_player ='1' WHERE dt_verify = $_POST[user_code] && dt_player !='2' ORDER BY pt_id LIMIT 1";
			$result1=mysql_query($player1_sql,$link)or die("Error in Selecting " . mysqli_error($player1_sql ));

		//傳pt_id到coin表裡
			$coin2_sql = "INSERT INTO tbl_coin (pt_id) SELECT pt_id FROM tbl_player WHERE dt_verify = $_POST[user_code] && dt_player = '0' ORDER BY pt_id desc LIMIT 1 ";
			$coin2_result =mysql_query($coin2_sql,$link)or die("Error in Selecting " . mysqli_error($coin2_sql));		

		//驗證碼正確的話將dt_player改成2(player2)
			$player2_sql = "UPDATE B11.tbl_player SET dt_player ='2' WHERE dt_verify = $_POST[user_code] && dt_player !='1' ORDER BY pt_id desc LIMIT 1";
			$result2=mysql_query($player2_sql,$link)or die("Error in Selecting " . mysqli_error($player2_sql)); 

		//檢查判斷用
		$sql = "SELECT dt_player FROM tbl_player Where dt_verify =$_SESSION[usercode] ORDER BY pt_id LIMIT 2";
		$result = mysql_query($sql,$link)or die("Error in Selecting " . mysql_error($sql));
		$array_user = array();
		while($row = mysql_fetch_array($result)){
			array_push($array_user, $row["dt_player"]);
		}	
		if($array_user[0]==$array_user[1]||$array_user[0]==0){
			//驗證碼正確的話將dt_player改成2(player2)
			$player2_sql = "UPDATE B11.tbl_player SET dt_player ='2' WHERE dt_verify = $_POST[user_code] ORDER BY pt_id LIMIT 1";
			$result2=mysql_query($player2_sql,$link)or die("Error in Selecting " . mysqli_error($player2_sql)); 

		}
		

		//檢查是否兩個使用者都確認
			$check1_sql = "SELECT dt_player FROM B11.tbl_player WHERE dt_verify = $_POST[user_code] && dt_player = '1'";
			$check2_sql = "SELECT dt_player FROM B11.tbl_player WHERE dt_verify = $_POST[user_code] && dt_player = '2'";
		
	
		$c1_result=mysql_query($check1_sql,$link)or die("Error in Selecting " . mysqli_error($check1_sql ));
		$c2_result=mysql_query($check2_sql,$link)or die("Error in Selecting " . mysqli_error($check2_sql));

		$row1=mysql_fetch_array($c1_result);
		$row2=mysql_fetch_array($c2_result);

		//確認無誤回傳ok
		if($row1["dt_player"] == 1 && $row2["dt_player"] == 2){
			echo ("ok");
		}
		//echo json_encode($array_user);
		//echo $array_user[1];
		//釋放查詢結果所佔用的記憶體
		mysql_free_result($result);
		mysql_free_result($result1);
		mysql_free_result($result2);
		mysql_free_result($c1_result);
		mysql_free_result($c2_result);
		mysql_free_result($coin1_result);
		mysql_free_result($coin2_result);


		//關閉資料庫
		mysql_close($result);
		mysql_close($result1);
		mysql_close($result2);
		mysql_close($c1_result);
		mysql_close($c2_result);
		mysql_close($coin1_result);
		mysql_close($coin2_result);
	?>