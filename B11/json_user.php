
	<?php
		session_start();
		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		//判斷單雙人
		$player_sql = "SELECT pt_playerno FROM tbl_player WHERE dt_verify = $_SESSION[usercode]";
		$p_result = mysql_query($player_sql,$link)or die("Error in Selecting " . mysqli_error($player_sql));
		$row=mysql_fetch_array($p_result);


		if($row["pt_playerno"] == 4){	//單人傳值
			$sql = "SELECT dt_y FROM tbl_move WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode]) ORDER BY mt_id DESC LIMIT 1";
			$result = mysql_query($sql,$link)or die("Error in Selecting " . mysqli_error($sql));
			$array_user = array();
			while($obj = mysql_fetch_assoc($result)){
				$array_user[] = $obj;
			}	
		}else if($row["pt_playerno"] == 5){	//雙人傳值
			$sql_1 = "SELECT dt_y FROM tbl_move WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1') ORDER BY mt_id DESC LIMIT 1";
			$sql_2 = "SELECT dt_y FROM tbl_move WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='2') ORDER BY mt_id DESC LIMIT 1";
			$result_1 = mysql_query($sql_1,$link)or die("Error in Selecting " . mysqli_error($sql_1));
			$result_2 = mysql_query($sql_2,$link)or die("Error in Selecting " . mysqli_error($sql_2));

			$obj_1 = mysql_fetch_row($result_1);
			$obj_2 = mysql_fetch_row($result_2);
			$array_user = array(array('dt_y'=>$obj_1[0]),array('dt_y'=>$obj_2[0]));
		}


		echo json_encode($array_user);

		//echo $obj[0];
		//釋放查詢結果所佔用的記憶體
		mysql_free_result($result);
		mysql_free_result($result_1);
		mysql_free_result($result_2);


		//關閉資料庫
		mysql_close($result);
		mysql_close($result_1);
		mysql_close($result_2);
?>
