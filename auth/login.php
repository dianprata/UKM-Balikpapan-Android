<?php
require_once "config.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$username = $request->username;
$password = $request->password;

// $query = $koneksi->query("SELECT * FROM users WHERE username $username")

 
if($username=="admin" && $password=="admin"){
	session_start();
	$_SESSION["username"] = $username;
	print 'true';
}else{
	print 'false';
}
header("Access-Control-Allow-Origin: *");
?>