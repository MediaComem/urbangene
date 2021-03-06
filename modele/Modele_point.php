<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Modele_point
 *
 * @author Raphael Baumann
 */


class Modele_point{
    
    
    protected $id;
    protected $lng;
    protected $lat;
    protected $zoom;
    protected $date;
    protected $idAutreEspece;
    protected $idUtilisateur;
     
    public function getDate() {
	    return $this->date;
    }
    
    public function setDate($date) {
	    $this->date = $date;
    }
        
    public function getZoom() {
        return $this->zoom;
    }

    public function setZoom($zoom) {
        $this->zoom = $zoom;
    }
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }
    public function getLng() {
        return $this->lng;
    }

    public function getLat() {
        return $this->lat;
    }

    public function setLng($lng) {
        $this->lng = $lng;
    }

    public function setLat($lat) {
        $this->lat = $lat;
    }
    public function getIdAutreEspece() {
        return $this->idAutreEspece;
    }

    public function getIdUtilisateur() {
        return $this->idUtilisateur;
    }

    public function setIdAutreEspece($idAutreEspece) {
        $this->idAutreEspece = $idAutreEspece;
    }

    public function setIdUtilisateur($idUtilisateur) {
        $this->idUtilisateur = $idUtilisateur;
    }

    public function getJsonData() {
    	$date = new DateTime($this->date);
        $date = $date->format('d/m/Y');
        return array(
            'id' => $this->id,
            'lng' => $this->lng,
            'lat' => $this->lat,
            'zoom' => $this->zoom,
            'date' => $date
        );
    }

}


?>