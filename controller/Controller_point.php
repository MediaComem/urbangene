<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Manager_point
 *
 * @author bastieneichenberger
 */

require_once (ROOT . CONF_DIR .'ControllerException.php');
require_once (ROOT . MODELE_DIR .'Modele_point.php');
require_once (ROOT . MODELE_DIR .'Modele_type.php');
require_once (ROOT . MODELE_DIR .'Modele_utilisateur.php');
require_once (ROOT . MODELE_DIR .'Modele_autreEspece.php');
require_once (ROOT . MODELE_DIR .'Modele_preservation.php');
require_once (ROOT . CRUD_DIR .'Crud_point.php');
require_once (ROOT . CRUD_DIR .'Crud_type.php');
require_once (ROOT . CRUD_DIR .'Crud_autreEspece.php');
require_once (ROOT . CRUD_DIR .'Crud_utilisateur.php');
require_once (ROOT . CRUD_DIR .'Crud_preservation.php');


class Controller_point {
    
    private $crud_point;
    private $crud_type;
    private $crud_autreEspece;
    private $crud_utilisateur;
    private $crud_preservation;
    private $model_point;
    private $model_autreEspece;
    private $model_utilisateur;
    private $model_preservations = array();
    private $model_types = array();
    private $idAutreEspece;




    public function __construct() {
        $this->crud_point = new Crud_point();
        $this->crud_type = new Crud_type();
        $this->crud_autreEspece = new Crud_autreEspece();
        $this->crud_utilisateur = new Crud_utilisateur();
        $this->crud_preservation = new Crud_preservation();
        $this->model_autreEspece = new Modele_autreEspece();
        $this->model_point = new Modele_point();
        $this->model_utilisateur = new Modele_utilisateur();
    }
    
    function add(){
        //point
        $lng = isset($_GET['lng']) ? $_GET['lng'] : NULL;
        $lat = isset($_GET['lat']) ? $_GET['lat'] : NULL;
        $zoom = isset($_GET['zoom']) ? $_GET['zoom'] : NULL;
        
        //autre espece
        $aeNom = isset($_GET['aeNom']) ? $_GET['aeNom'] : NULL;
        $aeSource = isset($_GET['aeSource']) ? $_GET['aeSource'] : NULL;
        
        //Info Perso
        $pseudo = isset($_GET['pseudo']) ? $_GET['pseudo'] : NULL;
        $utilisateur = isset($_GET['utilisateur']) ? $_GET['utilisateur'] : NULL;
        $typelocation = isset($_GET['typelocation']) ? $_GET['typelocation'] : NULL;
        $autorisation = isset($_GET['autorisation']) ? $_GET['autorisation'] : "FALSE";
        $mail = isset($_GET['mail']) ? $_GET['mail'] : NULL;
        
        $distance = isset($_GET['distance']) ? $_GET['distance'] : NULL;
        $presence = isset($_GET['presence']) ? $_GET['presence'] : NULL;
        $qualitevie = isset($_GET['qualitevie']) ? $_GET['qualitevie'] : -1;
        $qualite = isset($_GET['qualite']) ? $_GET['qualite'] : -1;
        $questionsup = isset($_GET['questionsup']) ? $_GET['questionsup'] : "NULL";
        $sante = isset($_GET['sante']) ? $_GET['sante'] : -1;
        
        
        $preservations = array();
        if(isset($_GET['preservation'])){
            foreach ($_GET['preservation'] as $selectedOption){
                array_push($preservations, $selectedOption);
            }
        }else{
            $preservations = NULL;
        };
        
        $types = array();
        if(isset($_GET['types'])){
            foreach ($_GET['types'] as $type){
                array_push($types, $type);
            }
        }else{
            $types = NULL;
        }
        
        if($aeNom != NULL && $aeSource != NULL){
            $aeNom = pg_escape_string($aeNom);

            $this->model_autreEspece->setNom($aeNom);
            $this->model_autreEspece->setSource($aeSource);
            $idAutreEspece = $this->crud_autreEspece->insert($this->model_autreEspece);
        }else{
            $idAutreEspece = NULL;
        }
        if($utilisateur == NULL){
        	$pseudo = pg_escape_string($pseudo);
        	$mail = pg_escape_string($mail);
        	
            $this->model_utilisateur->setPseudo($pseudo);
            $this->model_utilisateur->setAutorisation($autorisation);
            $this->model_utilisateur->setMail($mail);
            $this->model_utilisateur->setDistance($distance);
            $this->model_utilisateur->setPresence($presence);
            $this->model_utilisateur->setQualitevie($qualitevie);
            $this->model_utilisateur->setQuestionsup($questionsup);
            $this->model_utilisateur->setSante($sante);
            $this->model_utilisateur->setQualite($qualite);
            $this->model_utilisateur->setTypelocation($typelocation);
            $idUtilisateur = $this->crud_utilisateur->insert($this->model_utilisateur);
        }else{
            $idUtilisateur = $utilisateur;
        }
        
        if($preservations > 0){
            foreach($preservations as $preservation){
            	$preservation = pg_escape_string($preservation);
                $model_preservation = new Modele_preservation();
                $model_preservation->setText($preservation);
                $model_preservation->setId_utilisateur($idUtilisateur);
                array_push($this->model_preservations, $model_preservation);
            }
            $idPreservations = $this->crud_preservation->insert($this->model_preservations);
        }
        $date = date('Y-m-d');
        $this->model_point->setDate($date);
        $this->model_point->setLat($lat);
        $this->model_point->setLng($lng);
        $this->model_point->setZoom($zoom);
        $this->model_point->setIdAutreEspece($idAutreEspece);
        $this->model_point->setIdUtilisateur($idUtilisateur);
        $idPoint = $this->crud_point->insert($this->model_point);
        
        if($types != 0){
            foreach($types as $type){
                $modele_type = new Modele_type();
                $modele_type->setNom($type);
                $modele_type->setPoint_id($idPoint);
                array_push($this->model_types, $modele_type);
            }
        }
        $this->crud_type->insert($this->model_types);
        $returnValues = array();
        $returnValues['point'] = $this->model_point->getJsonData();
        $returnValues['types'] = $types;
        $returnValues['idUser'] = $idUtilisateur;
        $returnValues['username'] = $pseudo;
        echo json_encode($returnValues);
    }
    
    
    function getPoints(){
    	$points = $this->crud_point->getPoints();
        $pointsType = array();
        foreach($points as $point){
            $typeNoms = $this->crud_type->getTypeByPointId($point->getId());
            $objectArray = array();
            $objectArray["pointdata"] = $point->getJsonData();
            if($typeNoms > 0){
                $typeArray = array();
                foreach($typeNoms as $typeNom){
                    array_push($typeArray, $typeNom);
                }
                $objectArray["type"] = $typeArray;
            }
            $username = $this->crud_utilisateur->getUsernameById($point->getIdUtilisateur());
            $objectArray["username"] = $username;
            array_push($pointsType, $objectArray);
        }
        echo json_encode($pointsType);
    }
    
    function getPointById($id){
        $points = $this->crud_point->getPointsById($id);
    }
}

?>
