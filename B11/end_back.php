<?php
		session_start();

		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		
		$player_sql = "SELECT pt_playerno FROM tbl_player WHERE dt_verify = $_SESSION[usercode]";
		$p_result = mysql_query($player_sql,$link)or die("Error in Selecting " . mysqli_error($player_sql));
		$row=mysql_fetch_array($p_result);


		if($row["pt_playerno"] == 4){	//單人玩
			$sql = "UPDATE B11.tbl_coin SET ct_end = '1' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode]) ORDER BY ct_id DESC LIMIT 1";
			$result = mysql_query($sql,$link)or die("Error in Selecting " . mysqli_error($sql));

			$gameover_sql = "SELECT pt_start FROM tbl_player WHERE dt_verify = $_SESSION[usercode] LIMIT 1";

		}else if($row["pt_playerno"] == 5){	//雙人玩
			if($_POST['end_player'] == 1 && $_POST['end_result'] == 1){	//player1 win
				$sql_1 = "UPDATE B11.tbl_coin SET ct_end = '1' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1') ORDER BY ct_id DESC LIMIT 1";
				$result_1 = mysql_query($sql_1,$link)or die("Error in Selecting " . mysqli_error($sql_1));
			}else if($_POST['end_player'] == 1 && $_POST['end_result'] == 2){ //player1 lose
				$sql_2 = "UPDATE B11.tbl_coin SET ct_end = '2' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1') ORDER BY ct_id DESC LIMIT 1";
				$result_2 = mysql_query($sql_2,$link)or die("Error in Selecting " . mysqli_error($sql_2));
			}if($_POST['end_player'] == 2 && $_POST['end_result'] == 1){	//player2 win
				$sql_3 = "UPDATE B11.tbl_coin SET ct_end = '1' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='2') ORDER BY ct_id DESC LIMIT 1";
				$result_3 = mysql_query($sql_3,$link)or die("Error in Selecting " . mysqli_error($sql_3));
			}else if($_POST['end_player'] == 2 && $_POST['end_result'] == 2){ //player2 lose
				$sql_4 = "UPDATE B11.tbl_coin SET ct_end = '2' WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='2') ORDER BY ct_id DESC LIMIT 1";
				$result_4 = mysql_query($sql_4,$link)or die("Error in Selecting " . mysqli_error($sql_4));
			}
			$gameover_sql = "SELECT pt_start FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1'LIMIT 1";
		}

		$over_result = mysql_query($gameover_sql,$link)or die("Error in Selecting " . mysqli_error($gameover_sql));
		$over_row=mysql_fetch_array($over_result);


		echo $over_row["pt_start"];
		
		

		//釋放查詢結果所佔用的記憶體
		mysql_free_result($p_result);
		mysql_free_result($result);
		mysql_free_result($result_1);
		mysql_free_result($result_2);
		mysql_free_result($result_3);
		mysql_free_result($result_4);

		//關閉資料庫
		mysql_close($p_result);
		mysql_close($result);
		mysql_close($result_1);
		mysql_close($result_2);
		mysql_close($result_3);
		mysql_close($result_4);
	?>