<?php

/**
 * Description of Connection
 *
 * @author bastieneichenberger
 */
class Connection {

    //private static $CONFIG = "host=poulpe.heig-vd.ch port=5432 dbname=ogo13m user=ogo13 password=ogo13db";
    //private static $CONFIG = "host=193.134.217.88 port=5432 dbname=urbangene user=ogo13 password=ogo13db";
    private static $CONFIG = "host=193.134.217.88 port=5432 dbname=urbangene_dev user=urbangene password=jtm33fpr";
    private $conn;

    public function __construct() {
    	//$this->conn = PDO('pgsql:user=ogo13 dbname=urbangene password=examplepass')
        $this->conn = pg_connect(self::$CONFIG) or die('connection failed');
        pg_set_client_encoding($this->conn, "UTF-8");
    }
    
    public function getConnection(){
        return $this->conn;
    }

}

?>
