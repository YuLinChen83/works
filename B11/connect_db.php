<?php
	//建立資料庫連線
	$link = mysql_connect($HOST,$USERNAME,$PASSWORD);

	//選擇資料庫
	mysql_select_db($DATANAME,$link);

?>