<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Crud_preservation
 *
 * @author macbookprocmc
 */

require_once (ROOT . CONF_DIR .'Connection.php');
require_once (ROOT . CONF_DIR .'DAOException.php');

require_once (ROOT . MODELE_DIR .'Modele_preservation.php');

class Crud_preservation {
    protected $conn;
    protected $ids = array();

    public function insert(Array $preservations){
            
        $db = new Connection();
        $this->conn = $db->getConnection();
        
        foreach ($preservations as $preservation){
            pg_query($this->conn, "BEGIN WORK");
            $query = "INSERT INTO preservation(text, id_utilisateur)
                VALUES ('".$preservation->getText()."',".$preservation->getId_utilisateur().") RETURNING id ";
            $result = pg_query($this->conn, $query);
            if (!$result) {
                pg_query($this->conn, "ROLLBACK");
                throw new DAOException("problème lors de l'insert point , "
                        .$preservation->getText()."',".$preservation->getId_utilisateur()." , ....", 500);
            } else {
                pg_query($this->conn, "COMMIT");
            }
            $insert_row = pg_fetch_row($result);
            $insert_id = $insert_row[0];
            array_push($this->ids, $insert_id);
        }
        return $this->ids;
    }
}
