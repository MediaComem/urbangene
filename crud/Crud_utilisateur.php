<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Crud_utilisateur
 *
 * @author macbookprocmc
 */

require_once (ROOT . CONF_DIR .'Connection.php');
require_once (ROOT . CONF_DIR .'DAOException.php');

require_once (ROOT . MODELE_DIR .'Modele_utilisateur.php');

class Crud_utilisateur {
    protected $conn;


    public function insert(Modele_utilisateur $utilisateur){
            
        $db = new Connection();
        $this->conn = $db->getConnection();
        
        
        pg_query($this->conn, "BEGIN WORK");
        $query = "INSERT INTO utilisateur(pseudo, typelocation, mail, autorisation, presence, distance ,qualitevie, sante, qualite, questionsup)
            VALUES ('"
                .$utilisateur->getPseudo()."', '"
                .$utilisateur->getTypelocation()."', '"
                .$utilisateur->getMail()."', "
                .$utilisateur->getAutorisation().", '"
                .$utilisateur->getPresence()."', '"
                .$utilisateur->getDistance()."', "
                .$utilisateur->getQualitevie().", "
                .$utilisateur->getSante().", "
                .$utilisateur->getQualite().","
                .$utilisateur->getQuestionsup().") RETURNING id ";

        $result = pg_query($this->conn, $query);
        if (!$result) {
            pg_query($this->conn, "ROLLBACK");
            throw new DAOException("problème lors de l'insert point , "
                    .$utilisateur->getTypelocation()."', '"
                    .$utilisateur->getMail()."', '"
                    .$utilisateur->getAutorisation()."', '"
                    .$utilisateur->getPresence()."', '"
                    .$utilisateur->getDistance()."', '"
                    .$utilisateur->getQualitevie()."', '"
                    .$utilisateur->getSante()."', '"
                    .$utilisateur->getQualite()."','"
                    .$utilisateur->getQuestionsup()."', ....", 500);
        } else {
            pg_query($this->conn, "COMMIT");
        }
        $insert_row = pg_fetch_row($result);
        $insert_id = $insert_row[0];
        return $insert_id;
    }
}
