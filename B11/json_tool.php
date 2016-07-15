
	<?php
		session_start();
		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		//判斷單雙人
		$player_sql = "SELECT pt_playerno FROM tbl_player WHERE dt_verify = $_SESSION[usercode]";
		$p_result = mysql_query($player_sql,$link)or die("Error in Selecting " . mysqli_error($player_sql));
		$row=mysql_fetch_array($p_result);


		if($row["pt_playerno"] == 4){	//單人傳值
			$sql = "SELECT * FROM tbl_button WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode]) ORDER BY bt_id DESC LIMIT 1";
			$result = mysql_query($sql,$link)or die("Error in Selecting " . mysqli_error($sql));

			$array_tool = array();
			while($obj = mysql_fetch_assoc($result)){
				$array_tool[] = $obj;
			}

		}else if($row["pt_playerno"] == 5){	//雙人傳值
			$sql_1 = "SELECT dt_ok, dt_jump, dt_tool1, dt_tool2, dt_tool3, dt_tool4 FROM tbl_button WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='1') ORDER BY bt_id DESC LIMIT 1";
			$sql_2 = "SELECT dt_ok, dt_jump, dt_tool1, dt_tool2, dt_tool3, dt_tool4 FROM tbl_button WHERE pt_id=(SELECT pt_id FROM tbl_player WHERE dt_verify = $_SESSION[usercode] && dt_player='2') ORDER BY bt_id DESC LIMIT 1";
			$result_1 = mysql_query($sql_1,$link)or die("Error in Selecting " . mysqli_error($sql_1));
			$result_2 = mysql_query($sql_2,$link)or die("Error in Selecting " . mysqli_error($sql_2));

			$obj_1 = mysql_fetch_row($result_1);
			$obj_2 = mysql_fetch_row($result_2);
			$array_tool = array(array('dt_ok'=>$obj_1[0],'dt_jump'=>$obj_1[1],'dt_tool1'=>$obj_1[2],'dt_tool2'=>$obj_1[3],'dt_tool3'=>$obj_1[4],'dt_tool4'=>$obj_1[5]),array('dt_ok'=>$obj_2[0],'dt_jump'=>$obj_2[1],'dt_tool1'=>$obj_2[2],'dt_tool2'=>$obj_2[3],'dt_tool3'=>$obj_2[4],'dt_tool4'=>$obj_2[5]));
		}



		echo json_encode($array_tool);


		//釋放查詢結果所佔用的記憶體
		mysql_free_result($result);
		mysql_free_result($result_1);
		mysql_free_result($result_2);


		//關閉資料庫
		mysql_close($result);
		mysql_close($result_1);
		mysql_close($result_2);
	?>
