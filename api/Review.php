<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers,Authorization,X-Requested-With");
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
$method = $_SERVER['REQUEST_METHOD'];
$con=mysqli_connect("localhost","root","","react_crud");
    switch($method) {
        case 'GET':
                $trp = mysqli_query($con, "SELECT * from tblreview ");
                $rows = array();
                if ($trp) {
                   while($r = mysqli_fetch_assoc($trp)) {
                       $rows[] = $r;
                   }
                   print json_encode($rows);
                }else{
                    echo json_encode(["success" => 0, "msg" => "review not fatch!"]);
                }
        case 'POST':
         $data= json_decode(file_get_contents("php://input"));
         if (isset($data)) {
             $uname=$data->name; 
             $email=$data->email; 
             $address=$data->address;
             $description=$data->description; 
             $imgUrl=$data->imgUrl; 
             if(isset($uname)){
                 $sql="insert into tblreview(_id,name,email,imgUrl,address,description) values(NULL,'$uname','$email','$imgUrl','$address','$description')";
                 $result=mysqli_query($con,$sql);
                     if ($result) {
                        echo json_encode(["success" => 1, "msg" => "review confirm"]);
                    } else {
                        echo json_encode(["success" => 0, "msg" => "review not Confirm!"]);
                    }
                }
                else{
                   echo json_encode(["success" => 0, "msg" => "review not found!"]);
                }
         }
}
?>
