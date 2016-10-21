<!DOCTYPE html>
<html>
	<head>
		<link type="text/css" rel="stylesheet" href="commentpage.css"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="jquery.cascade.js"></script>
		<script type="text/javascript" src="jquery.cascade.ext.js"></script>
		<script type="text/javascript" src="jquery.templating.js"></script>
		<title>輔仁大學選課評鑑網-評論瀏覽</title>
	</head>
	<body>
    <div id="home">
      <a href="http://fjuclass2015.lionfree.net/">回首頁</a>
    </div>
		<p align="center" style="font-size:46pt;font-color:#e25f5f;margin-top:-10px;">課程評論瀏覽</p>
		<?php
			$myclassid =  $_GET['myid'];
			
			
			$mysqli = new mysqli("mysql.lionfree.net","u272692209_web","xu.6m4u;6","u272692209_web");
			if ($mysqli->connect_errno) {
      			echo "Failed to connect to MySQL: " . $mysqli->connect_error;
  			}else{
          echo "<font face=微軟正黑體>";
  				if($myclassid==""){
  					echo "　　　還沒有byclass喔！你從哪進來的＠Ａ＠？";
  					header("refresh:2; url=http://fjuclass2015.lionfree.net/");
					exit;
  				}

  				$mysqli->query("SET NAMES 'utf8'");
  				$myClass= $mysqli->query("SELECT * FROM ClassTable WHERE ClassID = '$myclassid'");
  				
  					while($myrow = $myClass->fetch_assoc()){
  						$Clified = $myrow["Classified"];
  						$Clname = $myrow["ClassName"];
  						$Clteacher = $myrow["Teacher"];
  					}
  					
  				$commentresult = $mysqli->query("SELECT * FROM Comments WHERE ClassID = '$myclassid'");//撈該堂課程的評論（可能很多）
  				if($commentresult){
  					if(mysqli_num_rows($commentresult)==0){
            	  		echo "<p>　　　目前這堂課程還沒有評論喔！你可以去新增：）</p>";
            	  		header("refresh:2;http://fjuclass2015.lionfree.net/commentpage.php?myid=$myclassid");
            		}
            		else
	            		echo "　　　　課程: <font size=5>".$Clname."</font>	老師: <font size=5>".$Clteacher."</font> 的課程評論<br><br>";

  					while($myrow = $commentresult->fetch_assoc()){
  						echo "<TABLE  ALIGN=center WIDTH=80% BORDER=1 class=\"tables\"><TR>";
  						echo "<TD><font color=e25f5f>課程名稱 </font>".$Clname."</TD>";
  						echo "<TD><font color=e25f5f>課程老師 </font>".$Clteacher."</TD></TR><TR>";
  						echo "<TD><font color=e25f5f>課程分類 </font>".$Clified."</TD>";
  						echo "<TD><font color=e25f5f>評論時間 </font>".$myrow["ComTime"]."</TD></TR><TR><TD colspan=2><font color=e25f5f>評論內容 </font><br>".nl2br($myrow["Comments"])."</TD></TR>";
  						echo "</TABLE><BR>";
  					}
  						echo "<button class = \"buttons\" style=\"background:#ffebcd;width:20%;margin-left:40%;\" type=\"submit\" onclick=\"location.href='commentpage.php?myid=$myclassid'\">我要新增</button><br>";
  				}
  			}
		?>


	</body>
</html>