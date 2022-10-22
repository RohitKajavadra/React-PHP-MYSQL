<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
$con=mysqli_connect("localhost","root","","react_crud");
            $data= json_decode(file_get_contents("php://input"));
            if (isset($data->id)) {
                $delID = $data->id;
                $deleteUser = mysqli_query($con, "delete from `tblorder` where `orderId`='$delID'");
                if ($deleteUser) {
                    echo json_encode(["success" => 1, "msg" => "order Deleted"]);
                } else {
                    echo json_encode(["success" => 0, "msg" => "order Not Found!"]);
                }
            } else {
                echo json_encode(["success" => 0, "msg" => "order Not Found!"]);
            }
?>