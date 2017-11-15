	
<?php
 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
 
if(isset($_GET["e"]) && isset($_GET["p"]) ){
	if( !empty($_GET["e"])  && !empty($_GET["p"])  ){
	
		$conn = new mysqli("127.0.0.1", "root", "root", "ukmbpn");
		
		$username=$_GET["e"];
		$password=$_GET["p"];
		
		// To protect MySQL injection for Security purpose
		$username = stripslashes($username);
		$password = stripslashes($password);
		$username = $conn->real_escape_string($username);
		$password = $conn->real_escape_string($password);
		$password = md5($password);
 
		
		$query="SELECT * FROM users WHERE username like '".$username."' and password like '".$password."'";
		$result = $conn->query($query);
		$outp = "";
		
		if( $rs=$result->fetch_array(MYSQLI_ASSOC)) {
			if ($outp != "") {$outp .= ",";}
			$outp .= '{"id_user":"'  . $rs["id_user"] . '",';
			$outp .= '"nama":"'   . $rs["nama"]        . '",';
			$outp .= '"username":"'   . $rs["username"]        . '",';
			$outp .= '"email":"'. $rs["u_pincode"]     . '"}';
		}
		$outp ='{"records":'.$outp.'}';
		$conn->close();
 
		echo($outp);
	}
}
 
?>