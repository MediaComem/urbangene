<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of crud_point
 *
 * @author Raphael Baumann
 */

require_once (ROOT . CONF_DIR .'Connection.php');
require_once (ROOT . CONF_DIR .'DAOException.php');

require_once (ROOT . MODELE_DIR .'Modele_type.php');

class Crud_type{
    
    protected $conn;

    public function insert(Array $types){
        
        $db = new Connection();
        $this->conn = $db->getConnection();
        
        foreach($types as $type){
            pg_query($this->conn, "BEGIN WORK");
            $query = "INSERT INTO type(id_point, nom)
                VALUES (".$type->getPoint_id().", '".$type->getNom()."')";
            $result = pg_query($this->conn, $query);
            if (!$result) {
                pg_query($this->conn, "ROLLBACK");
                throw new DAOException("problème lors de l'insert de l'id du point , "
                        .$type->getPoint_id()." et le nom de type ".$type->getNom()."', , ....", 500);
            } else {
                pg_query($this->conn, "COMMIT");
            }
        }
    }

    public function getTypeByPointId($pointId){
        $db = new Connection();
        $this->conn = $db->getConnection();
        
        $query = "SELECT nom FROM type WHERE id_point = '".$pointId."';";

        $result = pg_query($this->conn, $query);

        if (!$result){
            throw new DAOException("erreur lors de la requête", 500);
        }
        $noms = array();
        while ($row = pg_fetch_row($result)) {
            array_push($noms, $row[0]);
        }
        return $noms;
    }

}