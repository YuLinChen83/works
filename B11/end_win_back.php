<?php
		session_start();

		include_once("configure.php");			//嵌入另外寫的資料庫程式
		include_once("connect_db.php");			//嵌入另外寫的資料庫程式

		$woods_sql = "UPDATE B11.tbl_player SET pt_woods = $_POST[woodOK] WHERE dt_verify = $_SESSION[usercode] ORDER BY pt_id DESC LIMIT 1";
		$woods_result = mysql_query($woods_sql,$link)or die("Error in Selecting " . mysqli_error($woods_sql));

		//抓排名資料（前三名）
		$win_sql = "SELECT dt_name , pt_woods FROM tbl_player ORDER BY pt_woods DESC LIMIT 3";
		$win_result = mysql_query($win_sql,$link)or die("Error in Selecting " . mysqli_error($win_sql));
		
		$array_user = array();
            while($obj = mysql_fetch_assoc($win_result)){
                $array_user[] = $obj;
            }


		echo json_encode($array_user);
		
		

		//釋放查詢結果所佔用的記憶體
		mysql_free_result($win_result);
		mysql_free_result($woods_result);

		//關閉資料庫
		mysql_close($win_result);
		mysql_close($woods_result);
		
	?>