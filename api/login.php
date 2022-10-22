<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");

$con=mysqli_connect("localhost","root","","react_crud");
$data= json_decode(file_get_contents("php://input"));

$email=$data->email; 
$password=$data->password; 

$res=mysqli_query($con,"select * from `userinfo` where email='".$email."' AND password='".$password."'");

$nums=mysqli_num_rows($res);
$rs=mysqli_fetch_array($res);
if($nums>=1){
    http_response_code(200);
    $outp="";

    $outp .='{"name":"'.$rs["name"].'",';
    $outp .='"email":"'.$rs["email"].'",';
    $outp .='"password":"'.$rs["password"].'",';
    $outp .='"imgUrl":"'.$rs["imgUrl"].'",';
    $outp .='"isAdmin":"'.$rs["isAdmin"].'",';
    $outp .='"Status":"200"}';
    echo $outp;
    
}
else{
    http_response_code(202);
}
?>