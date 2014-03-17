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

require_once (ROOT . MODELE_DIR .'Modele_point.php');

class Crud_point{
    
    protected $conn;
    
    public function insert(Modele_point $point){
            
        $db = new Connection();
        $this->conn = $db->getConnection();

        pg_query($this->conn, "BEGIN WORK");
        if($point->getIdAutreEspece()){
        $query = "INSERT INTO point(geom, zoom, fkey_id_utilisateur, fkey_id_autreespece)
            VALUES (ST_GeometryFromText('POINT(".$point->getLng()." ".$point->getLat().")', 4326 ), "
                .$point->getZoom().", "
                .$point->getIdUtilisateur().", "
                .$point->getIdAutreEspece().") RETURNING id ";
        }  else {
            $query = "INSERT INTO point(geom, zoom, fkey_id_utilisateur)
            VALUES (ST_GeometryFromText('POINT(".$point->getLng()." ".$point->getLat().")', 4326 ), "
                .$point->getZoom().", "
                .$point->getIdUtilisateur().") RETURNING id ";
        }
        $result = pg_query($this->conn, $query);
        if (!$result) {
            pg_query($this->conn, "ROLLBACK");
            throw new DAOException("problème lors de l'insert du point , "
                    .$point->getLat()."', '"
                    .$point->getLng()."', '"
                    .$point->getZoom()."', '"
                    .$point->getIdUtilisateur()."', '"
                    .$point->getIdAutreEspece()."', ....", 500);
        } else {
            pg_query($this->conn, "COMMIT");
        }
        $insert_row = pg_fetch_row($result);
        $insert_id = $insert_row[0];
        return $insert_id;
    }

    public function getPoints(){
        $db = new Connection();
        $this->conn = $db->getConnection();
                
        $query = "SELECT id, ST_AsGeoJSON(geom), zoom, fkey_id_utilisateur FROM point";

        $result = pg_query($this->conn, $query);

        if (!$result){
            throw new DAOException("erreur lors de la requête", 500);
        }
        $numRows = pg_num_rows($result);
        if($numRows==0){
            throw new DAOException("il n'y a pas de points dans cette zone", 500);
        }
        
        $points = array();
        while ($row = pg_fetch_row($result)) {
            $data = json_decode($row[1]);
            $point = new Modele_point();
            $point->setId($row[0]);
            $point->setZoom($row[2]);
            $point->setLat($data->coordinates[1]);
            $point->setLng($data->coordinates[0]);
            $point->setIdUtilisateur($row[3]);
            array_push($points, $point);
        }
        return $points;
        //echo json_encode($fc);//, JSON_UNESCAPED_SLASHES);
    }
    public function getPointsById($id){
        $db = new Connection();
        $this->conn = $db->getConnection();
                
        $query = "SELECT id, ST_AsGeoJSON(geom), zoom FROM point WHERE id = ".$id;
        
        $result = pg_query($this->conn, $query);

        if (!$result){
            throw new DAOException("erreur lors de la requête", 500);
        }
        $numRows = pg_num_rows($result);
        if($numRows==0){
            throw new DAOException("il n'y a pas de points dans cette zone", 500);
        }
        
        $data = json_decode($row[1]);
        $point = new Modele_point();
        $point->setId($row[0]);
        $point->setZoom($row[2]);
        $point->setLat($data->coordinates[1]);
        $point->setLng($data->coordinates[0]);
		
        return $point;
    }
}