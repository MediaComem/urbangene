<?php

/**
 * Description of Connection
 *
 * @author bastieneichenberger
 */
class Connection {

    private static $CONFIG = "host=localhost port=5432 dbname=DB_NAME user=USERNAME password=PASSWORD";
    private $conn;

    public function __construct() {
        $this->conn = pg_connect(self::$CONFIG) or die('connection failed');
        pg_set_client_encoding($this->conn, "UTF-8");
    }

    public function getConnection(){
        return $this->conn;
    }

}

?>
