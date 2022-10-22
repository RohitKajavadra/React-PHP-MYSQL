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
                $trp = mysqli_query($con, "SELECT * from contactus ");
                $rows = array();
                if ($trp) {
                   while($r = mysqli_fetch_assoc($trp)) {
                       $rows[] = $r;
                   }
                   print json_encode($rows);
                }else{
                    echo json_encode(["success" => 0, "msg" => "contactus data not fatch!"]);
                }
        case 'POST':
         $data= json_decode(file_get_contents("php://input"));
         if (isset($data)) {
             $uname=$data->username; 
             $email=$data->email; 
             $subject=$data->subject; 
             $message=$data->message; 
             if(isset($uname)){
                 $sql="insert into contactus(id,name,email,subject,message) values(NULL,'$uname','$email','$subject','$message')";
                 $result=mysqli_query($con,$sql);
                     if ($result) {
                        echo json_encode(["success" => 1, "msg" => "contactus confirm"]);
                    } else {
                        echo json_encode(["success" => 0, "msg" => "contactus not Confirm!"]);
                    }
                }
                else{
                   echo json_encode(["success" => 0, "msg" => "contactus not found!"]);
                }
         }
}
?>
