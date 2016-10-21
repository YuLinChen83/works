<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta name ="viewport" content ="width=device-width, initial-scale=1.0">
		<link type="text/css" rel="stylesheet" href="commentpage.css"/>
		
        <script src ="js/jquery-2.1.4.min.js" type ="text/javascript"></script>
        <script src ="js/commentlink.js" type ="text/javascript"></script>
		
		<title>課程蒐尋</title>
	</head>
	<body align="center">
		<div id="home">
			<a href="http://fjuclass2015.lionfree.net/">回首頁</a>
		</div>
        <p align="center" style="font-size:46pt;font-color:#e25f5f;margin-top:-10px;">我要評論</p><!-- Need css modify -->
        <div class="row" style="margin-top:-30px" id="list">
         	    <?php 
	                if (isset($_POST['action']) && $_POST['action'] == 'submitted') { 
	    				print '<pre>'; 
	    				print_r($_POST); 
	    				print '<a href="'. $_SERVER['PHP_SELF'] .'">Please try again</a>'; 
	    				print '</pre>'; 
					} else { 
				?>
				<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
	                <table align="center" style="margin-top:-30px;">
	                <tr>
	                <th>
	                        課程類別 <select id="myParentSelect" name="classcategory">
	                        <option value="">請選擇</option>
	                        <option value="通識" id="gen">通識</option>
	                        <option value="體育" id="phy">體育</option>
	                        <option value="英文" id="eng">英文</option>
	                    </select>　
	                </th> 
	                <th>
	                        分類細項 <select id="myFirstChildSelect" name="classdetail">
	                        <option value="" >請選擇</option>
	                        </select>
	                        <div id = "insertselect"></div> <!-- jQuery動態選標籤 -->
	                </th> 
	                <th>
						<button type="submit" class="btn">搜尋</button>
	                </th>
	                </tr> 
	                </table>
					
				</form>
				<?php 
				} 
				?>  
                	       
				<?php 
					header("Content-Type:text/html; charset=utf-8");
					$myclassdetail = $_POST['classdetail'];
					$mysqli = new mysqli("mysql.lionfree.net","u272692209_web","xu.6m4u;6","u272692209_web");
					if ($mysqli->connect_errno) {
      					echo "Failed to connect to MySQL: " . $mysqli->connect_error;
  					}else{
  						$n = 1;
  						$mysqli->query("SET NAMES 'utf8'");
  						$resultset = $mysqli->query("SELECT ClassName,Teacher,ClassID FROM ClassTable WHERE Classified = '$myclassdetail' ORDER BY ClassName ");//找出所有符合老師名稱的課程名稱
  						if($resultset){
            			//echo "<form action=\"commentpage.php \" method=\"get\">";
  							echo "<br>";
  							echo "<br>";
  							while($myrow = $resultset->fetch_assoc()){

  								$Clname = $myrow["ClassName"];
  								$ClTE = $myrow["Teacher"];
  								$ClID = $myrow["ClassID"];
  								echo "<button type=\"submit\" class = \"buttonLink\" onclick=\"location.href='commentpage.php?myid=$ClID'\" >$Clname  $ClTE</button>";
  								if ($n%2==0){
  									echo "<br>";
  									echo "<br>";
  								}
  								$n = $n+1;
  							}
  							echo "<br>";
            			//echo "</form>";
  						}
  					}
				?>

        </div>
	</body>
</html>