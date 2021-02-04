<?php

class Database{
    private $host = "localhost";
    private $db_name = "myDB";
    private $username = "root";
    private $password = "mrPRESIDENT_01";
    private $conn;


    //DB CONNECT

    public function connect(){
        $this->conn = null;

        try {
            $this->conn = new mysqli_connect($host, $username, $password, $db_name);
            echo "Connection successful";
        } catch (mysqli_sql_exception $e) {
            echo "Connection failed: ", $conn -> error;
        }

        return $this->conn;
    }
}

?>