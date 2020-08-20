<?php
$servername = "localhost";
$username = "root";
$password = "root_password";
$dbname = "webform";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname );

if(!$conn) {
    die ('Connection Failed: ' . mysqli_connect_error());
}else{
    echo "Connected successfully";
}

// mysqli_select_db("webform", $conn); 

if ( isset( $_POST['submit'] ) )
{
    $firstname=$_POST['firstname'];
    $lastname=$_POST['lastname'];
    $mail=$_POST['mail'];
    $country=$_POST['country'];
    $zipcode=$_POST['zipcode'];
    $cityName=$_POST['cityName'];
    if (!isset($_POST['google'])){
        $google=null;
    }else{
        $google=$_POST['google'];
    }
    if (!isset($_POST['twitter'])){
        $twitter=null;
    }else{
        $twitter=$_POST['twitter'];
    }
    if (!isset($_POST['linkdin'])){
        $linkdin=null;
    }else{
        $linkdin=$_POST['linkdin'];
    }
    if (!isset($_POST['facebook'])){
        $facebook=null;
    }else{
        $facebook=$_POST['facebook'];
    } 
    $comm=$_POST['comm']; 

    $sql="INSERT INTO userdata(firstname, lastname, mail, country, zipcode, cityname, google, twitter, linkdin, facebook, comm) VALUES('$firstname', '$lastname', '$mail', '$country', '$zipcode', '$cityName', '$google', '$twitter', '$linkdin', '$facebook', '$comm')";
    echo "your data is inserted";
}

if (mysqli_query($conn, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
mysqli_close($conn);
?>