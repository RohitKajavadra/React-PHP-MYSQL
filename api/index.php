<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
$method = $_SERVER['REQUEST_METHOD'];
    switch($method) {
        case 'POST':
         $data= json_decode(file_get_contents("php://input"));
         $uname=$data->name; 
         $email=$data->email; 
         $password=$data->password; 
         $imgUrl=NULL; 
         $isAdmin=$data->isAdmin || 0;
         $con=mysqli_connect("localhost","root","","react_crud");
         
         $sql="insert into userinfo(id,name,email,password,imgUrl,isAdmin) values(NULL,'$uname','$email','$password','$imgUrl','$isAdmin')";
         $result=mysqli_query($con,$sql);
             if ($result) {
                echo json_encode(["success" => 1, "msg" => "user confirm"]);
            } else {
                echo json_encode(["success" => 0, "msg" => "user not Confirm!"]);
            }
        }
?>