<!DOCTYPE html>
<html>
	<head>
        <link type="text/css" rel="stylesheet" href="commentpage.css"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>輔仁大學選課評鑑網-評論表單</title>
	</head>
	<body>
		<div id="home">
			<a href="http://fjuclass2015.lionfree.net/">回首頁</a>
		</div>
        <div id="header">
		<p align="center" style="font-size:46pt;font-color:#e25f5f";margin-top:-10px;>評論表單<img src="m3.png"><p>
        </div>
			<div class="col-md-6 col-md-offset-3" id="rules">
				<p style="font-size:18pt">
					一起來為學弟妹提供更可靠的選課資訊吧！<br><br>
					 規範:<br>
					 以下言論並不負本臺責任，請小心用詞！<br>
					 請盡量避免過於偏激的用詞。
				</p>
			</div>
		<p>

        <br>
        <div class="col-md-6 col-md-offset-3" id="comment">
		<p id="commenthint">↓  來 寫 評 論 吧 !  :)</p>
		<?php
			$myclassid =  $_GET['myid'];
			$mysqli = new mysqli("mysql.lionfree.net","u272692209_web","xu.6m4u;6","u272692209_web");
			if ($mysqli->connect_errno) {
      					echo "Failed to connect to MySQL: " . $mysqli->connect_error;
  				}else{
  					$mysqli->query("SET NAMES 'utf8'");
  					$resultset = $mysqli->query("SELECT ClassName,Teacher FROM ClassTable WHERE ClassID = '$myclassid'");//找出所有符合老師名稱的課程名稱
  					if($resultset){
  						while($myrow = $resultset->fetch_assoc()){
 						$Clname = $myrow["ClassName"];
  						$ClTE = $myrow["Teacher"];
  						echo "<p>我對 <font size=5>$ClTE</font> 老師上的 <font size=5>$Clname</font> 感想是:</p>";
  						}
  					}
  				}
			setrawcookie("destinationcommentid",$myclassid);
		?>
		<form action="addcomment.php" method="post">
			<textarea name="styled-textarea" id="styled" placeholder="開  始  評  論  =D"></textarea>
			<input type="submit" name="submit" value="Submit" id="submit"/>
		</form>
        <br>
		
		</p>
        </div>
		
		
	</body>
</html>