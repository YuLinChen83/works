<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name ="viewport" content ="width=device-width, initial-scale=1.0">
		<link type="text/css" rel="stylesheet" href="commentpage.css"/>
        <script src ="js/jquery-2.1.4.min.js" type ="text/javascript"></script>
        <script src ="js/commentlink.js" type ="text/javascript"></script>
	</head>
	<body class="text-center" >
    <div id="home">
      <a href="http://fjuclass2015.lionfree.net/">回首頁</a>
    </div>

		<?php 
			header("Content-Type:text/html; charset=utf-8");
			$byTE = $_POST['byTE'];
			//echo "<p>$myClassName<p>";
			$mysqli = new mysqli("mysql.lionfree.net","u272692209_web","xu.6m4u;6","u272692209_web");
			if ($mysqli->connect_errno) {
      			echo "Failed to connect to MySQL: " . $mysqli->connect_error;
  			}else{
          echo "<font face=微軟正黑體>";
          if($byTE==""){
            echo "　　　您的搜尋未輸入任何字喔！";
            header("refresh:2; url=http://fjuclass2015.lionfree.net/");
          exit;
          }

  				$mysqli->query("SET NAMES 'utf8'");
  				$resultset = $mysqli->query("SELECT ClassName,Teacher,Classified,ClassID FROM ClassTable WHERE Teacher LIKE '%$byTE%' ORDER BY ClassName");//找出所有符合老師名稱的課程名稱
  				
          if($resultset){
            
            if(mysqli_num_rows($resultset)==0){
              echo "　　　找不到關鍵字: <font size=5>\"".$byTE."\"</font>  的課程喔！";
            }
            else
              echo "　　　老師關鍵字: <font size=5>\"".$byTE."\"</font>  的有以下課程:<br><br>";
            //echo "<form action=\"...\" method=\"post\">";
  					while($myrow = $resultset->fetch_assoc()){
  						$Clname = $myrow["ClassName"];
  						$ClTE = $myrow["Teacher"];
  						$Classified = $myrow["Classified"];
              $ClID = $myrow["ClassID"];
  						echo "<button class = \"buttons\" type=\"submit\" onclick=\"location.href='http://fjuclass2015.lionfree.net/commentResults.php?myid=$ClID'\">$Clname  $Classified  $ClTE</button><br>";
  					}
            //echo "</form>";
  				}
          echo "</font>";
  			}
		?>
	</body>
</html>