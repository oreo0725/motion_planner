<?php
function startWith($src, $pattern){
	$length = strlen($pattern);
	return (substr($src, 0, $length) === $pattern);
}

$action = $_GET["action"];
//echo "data";
if($action == "read"){
	$path = $_GET["data"];
	$result = "error";
	if($file = fopen($path, "r")){
		$result = "";
		while(!feof($file))
		{
			$line = fgets($file);
			if(!startWith($line, "#")){
				$temp = explode(" ", $line);
				foreach($temp as $key){
					$val = trim($key, "\n\r");
					if($val != "")
						$result .= $val."\t";
				}
			}
		}
		fclose($file);
	}
	echo $result;
}
elseif ($action == "listdata"){
	//echo "reading";
	$dirPath = './data/';
	if ($handle = opendir($dirPath)) {
		//echo "Directory handle: $handle\n";
		//echo "Entries:\n";
		$dataArr = array("robo"=> array(), "obs" => array());
		/* This is the correct way to loop over the directory. */
		while (false !== ($entry = readdir($handle))) {
			//echo "$entry\n";
			if(startWith($entry, "robot")){
				$dataArr["robo"][] = $entry;
			}elseif (startWith($entry, "map")){
				$dataArr["obs"][] = $entry;
			}
		}
		//sort array
		sort($dataArr["robo"]);
		sort($dataArr["obs"]);
		//print_r($dataArr);
		echo "<div>Select map data:</div><br/><select name='robot' onchange=\"showData(this.value, 'r')\">";
		echo "<option value=\"\">Select robo:</option>";
		for($i = 0, $len = count($dataArr["robo"]); $i<$len; $i++){
			echo "<option value='".$dirPath.$dataArr["robo"][$i]."'>robot".$i."</option>";
		}
		echo "</select>";
		
		echo "<select name='obstacle' onchange=\"showData(this.value, 'o')\">";
		echo "<option value=\"\">Select obstacle:</option>";
		for($i = 0, $len = count($dataArr["obs"]); $i<$len; $i++){
			echo "<option value='".$dirPath.$dataArr["obs"][$i]."'>obstacle".$i."</option>";
		}
		echo "</select>";
		
		/* This is the WRONG way to loop over the directory. 
		while ($entry = readdir($handle)) {
			echo "$entry\n";
		}*/
		closedir($handle);
		
		//echo $dataArr;
	}else{
		echo "error";
	}
}

?>