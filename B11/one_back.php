<?php
	session_start();
	$_SESSION['usercode']=$_POST['user_code'];
		

		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		//傳pt_id到coin表裡
		$coin_sql = "INSERT INTO tbl_coin (pt_id) SELECT pt_id FROM tbl_player WHERE dt_verify = $_POST[user_code] && dt_player = '0'";

		//驗證碼正確的話將dt_player改成3(單人)
		$player1_sql = "UPDATE B11.tbl_player SET dt_player ='3' WHERE dt_verify = $_POST[user_code] ORDER BY pt_id LIMIT 1";
		
		//判斷手機是否遊戲開始
		//$sql = "SELECT pt_start FROM B11.tbl_player WHERE dt_verify = $_POST[user_code] ORDER BY pt_id desc LIMIT 1";

		$sql = "SELECT dt_player FROM B11.tbl_player WHERE dt_verify = $_POST[user_code] ORDER BY pt_id desc LIMIT 1";


		$c_result =mysql_query($coin_sql,$link)or die("Error in Selecting " . mysqli_error($coin_sql));
		$result1=mysql_query($player1_sql,$link)or die("Error in Selecting " . mysqli_error($player1_sql ));
		$result = mysql_query($sql,$link)or die("Error in Selecting " . mysqli_error($sql));

		
		$row=mysql_fetch_array($result);
		
		echo $row["dt_player"];
		//釋放查詢結果所佔用的記憶體
		mysql_free_result($result1);
		mysql_free_result($result);	
		mysql_free_result($c_result);	

		//關閉資料庫
		mysql_close($result1);
		mysql_close($result);
		mysql_close($c_result);
?>