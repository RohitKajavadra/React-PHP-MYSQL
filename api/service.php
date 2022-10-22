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
         $trp = mysqli_query($con, "SELECT * from tblservice");
         $rows = array();
         if ($trp) {
            while($r = mysqli_fetch_assoc($trp)) {
                $rows[] = $r;
            }
            print json_encode($rows);
         }
        case 'POST':
         $data= json_decode(file_get_contents("php://input"));
         if (isset($data)) {
             $service_name=$data->sname; 
             $description=$data->description; 
             $price=$data->price; 
             $imgUrl=$data->img; 
             if(isset($service_name)){
                 $sql="insert into tblservice(id,service_name,description,price,imgUrl) values(NULL,'$service_name','$description','$price','$imgUrl')";
                 $result=mysqli_query($con,$sql);
                     if($result){
                         $response['data']=array(
                             'status'=>'valid'
                         );
                         echo json_encode($response);
                     }
                     else{
                         $response['data']=array(
                             'status'=>'invalid'
                         );
                         echo json_encode($response);
                     }
                }
         }
}
        
        
?>
