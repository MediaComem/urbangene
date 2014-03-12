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

class Modele_type {
    
    protected $nom;
    protected $point_id;

    public function getNom() {
        return $this->nom;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }
    public function getPoint_id() {
        return $this->point_id;
    }

    public function setPoint_id($point_id) {
        $this->point_id = $point_id;
    }
}

?>