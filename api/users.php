<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
$con=mysqli_connect("localhost","root","","react_crud");
            $data= json_decode(file_get_contents("php://input"));
            if (isset($data)) {
		       $isAdmin=$data->isAdmin; 
                $trp = mysqli_query($con, "SELECT * from userinfo where isAdmin= '".$isAdmin."'");
                $rows = array();
                if ($trp) {
                   while($r = mysqli_fetch_assoc($trp)) {
                       $rows[] = $r;
                   }
                   print json_encode($rows);
                }else{
                    echo json_encode(["success" => 0, "msg" => "user count not fatch!"]);
                }
            } else {
                echo json_encode(["success" => 0, "msg" => "user count Not Found!"]);
            }
?>