<?php 

    // $servername = "localhost";  
    // $username = "ngozi";  
    // $password = "mrPRESIDENT01";  
    // $connect = pg_connect ($servername , $username , $password) or die("unable to connect to host");  
    // $pg = pg_select_db ('test',$connect) or die("unable to connect to database");

    // // $connect = mysql_connect("localhost", "admin_name", "password"); 
    $connect = pg_connect("host=localhost dbname=mydb user=ngozi password=mrPRESIDENT01");

    if(!$connect) {
        die('Connection Failed: '. pg_error());
    }

    pg_select_db("mydb", $connect);

    if($_POST['submit']){
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $mail = $_POST['mail'];
        $country = $_POST['country'];
        $zipcode = $_POST['zipcode'];
        $cityName = $_POST['cityName'];
        $google = $_POST['google'];
        $twitter = $_POST['twitter'];    
        $linkdin = $_POST['linkdin'];   
        $facebook = $_POST['facebook'];   
        $comm = $_POST['comm'];          
    }        

    $data = "INSERT INTO formData (id, firstname, lastname, email, country, zipcode, city_Name, google, twitter, linkdin, facebook, comm) VALUES ('', '$firstname', '$lastname', '$mail', '$country', '$zipcode', '$cityName', '$google', '$twitter', '$linkdin', '$facebook', '$comm')";        

    if (!pg_query($pg,$con)) {
        die('Error: '. pg_error());
    }
    echo "1 record added";
    pg_query($con,$data);

?>