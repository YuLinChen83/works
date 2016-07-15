<?php
		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		
		$sql = "SELECT pt_playerno,pt_start FROM tbl_player ORDER BY pt_id desc LIMIT 1 ";
		
		$result = mysql_query($sql,$link)or die("Error in Selecting " . mysqli_error($sql));
		
		//印出欄位內資料
		$array_user = array();
		while($obj = mysql_fetch_assoc($result)){
			$array_user[] = $obj;
		}

		echo json_encode($array_user);
		
		//釋放查詢結果所佔用的記憶體
		mysql_free_result($result);

		//關閉資料庫
		mysql_close($result);
	?>