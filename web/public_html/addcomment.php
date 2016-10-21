<?php
  header("Content-Type:text/html; charset=utf-8");
  $content = $_POST['styled-textarea'];
  	if ( $content == "" )
	{
		echo "留言內容不可為空白,請重新搜尋評論,感謝你的支持！";
		header("refresh:2; url=http://fjuclass2015.lionfree.net/");
		exit;
	}
  date_default_timezone_set('etc/gmt-8');
	$posttime = date ('Y-m-d H:i:s');
	$mysqli = new mysqli("mysql.lionfree.net","u272692209_web","xu.6m4u;6","u272692209_web");
	if ($mysqli->connect_errno) {
      					echo "Failed to connect to MySQL: " . $mysqli->connect_error;
  	}else{
  		$mysqli->query("SET NAMES 'utf8'");
  		$querysearch = $_COOKIE["destinationcommentid"];
  		$result = $mysqli->query("SELECT Comments FROM Comments WHERE ClassID = '$querysearch' ");
  		$numofcom = mysqli_num_rows($result);
  		$numofcom = $numofcom + 1;
  		
  		$mysqli->query("INSERT INTO Comments(ClassId,ComID,ComTime,Comments) VALUES ('".xss_clean($querysearch)."', '".$numofcom."','".$posttime."', '".xss_clean($content)."')");
  	}
  	echo "感謝支持本網站";
  	header("refresh:2; url=http://fjuclass2015.lionfree.net/commentResults.php?myid=$querysearch");
?>
<?php
      function xss_clean($data)
    {
    // Fix &entity\n;
    $data = str_replace(array('&amp;','&lt;','&gt;'), array('&amp;amp;','&amp;lt;','&amp;gt;'), $data);
    $data = preg_replace('/(&#*\w+)[\x00-\x20]+;/u', '$1;', $data);
    $data = preg_replace('/(&#x*[0-9A-F]+);*/iu', '$1;', $data);
    $data = html_entity_decode($data, ENT_COMPAT, 'UTF-8');

    // Remove any attribute starting with "on" or xmlns
    $data = preg_replace('#(<[^>]+?[\x00-\x20"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $data);

    // Remove javascript: and vbscript: protocols
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=[\x00-\x20]*([`\'"]*)[\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2nojavascript...', $data);
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iu', '$1=$2novbscript...', $data);
    $data = preg_replace('#([a-z]*)[\x00-\x20]*=([\'"]*)[\x00-\x20]*-moz-binding[\x00-\x20]*:#u', '$1=$2nomozbinding...', $data);

    // Only works in IE: <span style="width: expression(alert('Ping!'));"></span>
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?expression[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?behaviour[\x00-\x20]*\([^>]*+>#i', '$1>', $data);
    $data = preg_replace('#(<[^>]+?)style[\x00-\x20]*=[\x00-\x20]*[`\'"]*.*?s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:*[^>]*+>#iu', '$1>', $data);

    // Remove namespaced elements (we do not need them)
    $data = preg_replace('#</*\w+:\w[^>]*+>#i', '', $data);

    do
    {
      // Remove really unwanted tags
      $old_data = $data;
      $data = preg_replace('#</*(?:applet|b(?:ase|gsound|link)|embed|frame(?:set)?|i(?:frame|layer)|l(?:ayer|ink)|meta|object|s(?:cript|tyle)|title|xml)[^>]*+>#i', '', $data);
    }
    while ($old_data !== $data);

    // we are done...
    return $data;
    }
?>