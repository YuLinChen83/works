 
	<?php
		session_start();

		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		//判斷單雙人
		$player_sql = "SELECT pt_playerno FROM tbl_player WHERE dt_verify = $_SESSION[usercode]";
		$p_result = mysql_query($player_sql,$link)or die("Error in Selecting " . mysqli_error($player_sql));
		$row=mysql_fetch_array($p_result);


		if($row["pt_playerno"] == 4){	//單人玩
			$sql_3 = "UPDATE B11.tbl_coin SET ct_coin = $_POST[coinMax] WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode]) ORDER BY ct_id DESC LIMIT 1";
			$result_3 = mysql_query($sql_3,$link)or die("Error in Selecting " . mysqli_error($sql_3));
		}else if($row["pt_playerno"] == 5){	//雙人玩
			$sql_1 = "UPDATE B11.tbl_coin SET ct_coin = $_POST[coinMax] WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1') ORDER BY ct_id DESC LIMIT 1";
			$sql_2 = "UPDATE B11.tbl_coin SET ct_coin = $_POST[coinMax2] WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='2') ORDER BY ct_id DESC LIMIT 1";
			
			$result_1 = mysql_query($sql_1,$link)or die("Error in Selecting " . mysqli_error($sql_1));
			$result_2 = mysql_query($sql_2,$link)or die("Error in Selecting " . mysqli_error($sql_2));

		}
		//echo $row["pt_playerno"];
		
		

		//釋放查詢結果所佔用的記憶體
		mysql_free_result($p_result);
		mysql_free_result($result_1);
		mysql_free_result($result_2);
		mysql_free_result($result_3);

		//關閉資料庫
		mysql_close($p_result);
		mysql_close($result_1);
		mysql_close($result_2);
		mysql_close($result_3);
	?>