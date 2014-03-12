<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Modele_utilisateur
 *
 * @author macbookprocmc
 */
class Modele_utilisateur {
    protected $id;
    protected $pseudo;
    protected $typelocation;
    protected $mail;
    protected $autorisation;
    protected $importance;
    protected $distance;
    protected $presence;
    protected $qualitevie;
    protected $qualite;
    protected $sante;
    protected $questionsup;
    
    public function getPseudo() {
        return $this->pseudo;
    }

    public function setPseudo($pseudo) {
        $this->pseudo = $pseudo;
    }

    public function getDistance() {
        return $this->distance;
    }

    public function getPresence() {
        return $this->presence;
    }

    public function setDistance($distance) {
        $this->distance = $distance;
    }

    public function setPresence($presence) {
        $this->presence = $presence;
    }
    
    public function getQualite() {
        return $this->qualite;
    }

    public function setQualite($qualite) {
        $this->qualite = $qualite;
    }

    public function getId() {
        return $this->id;
    }

    public function getTypelocation() {
        return $this->typelocation;
    }

    public function getMail() {
        return $this->mail;
    }

    public function getAutorisation() {
        return $this->autorisation;
    }

    public function getImportance() {
        return $this->importance;
    }

    public function getQualitevie() {
        return $this->qualitevie;
    }

    public function getSante() {
        return $this->sante;
    }

    public function getQuestionsup() {
        return $this->questionsup;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setTypelocation($typelocation) {
        $this->typelocation = $typelocation;
    }

    public function setMail($mail) {
        $this->mail = $mail;
    }

    public function setAutorisation($autorisation) {
        $this->autorisation = $autorisation;
    }

    public function setImportance($importance) {
        $this->importance = $importance;
    }

    public function setQualitevie($qualitevie) {
        $this->qualitevie = $qualitevie;
    }

    public function setSante($sante) {
        $this->sante = $sante;
    }

    public function setQuestionsup($questionsup) {
        $this->questionsup = $questionsup;
    }
}
