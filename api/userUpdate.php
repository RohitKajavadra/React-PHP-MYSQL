<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
$con=mysqli_connect("localhost","root","","react_crud");
$data = json_decode(file_get_contents("php://input"));

if(isset($data)){
		$email=$data->email; 
		$imgUrl=$data->imgUrl; 
	$edit = mysqli_query($con,"UPDATE userInfo set imgUrl='".$imgUrl."' where email= '".$email."' ");
	if($edit){
		echo json_encode(["success"=>true]);
		return;
	}else{
		echo json_encode(["success"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
	} 
} else{
    echo json_encode(["success"=>false,"msg"=>"image not uploaded"]);
	return;
}
?>