<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Modele_autreEspece
 *
 * @author macbookprocmc
 */
class Modele_autreEspece {
    protected $id;
    protected $nom;
    protected $source;
    
    public function getId() {
    return $this->id;
    }

    public function getNom() {
    return $this->nom;
    }

    public function getSource() {
    return $this->source;
    }

    public function setId($id) {
    $this->id = $id;
    }

    public function setNom($nom) {
    $this->nom = $nom;
    }

    public function setSource($source) {
    $this->source = $source;
    }
    
}


