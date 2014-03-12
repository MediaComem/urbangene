<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DAOException
 *
 * @author bastieneichenberger
 */
class DAOException extends Exception{
    
    public function __construct($message, $code, $previous = NULL) {
        parent::__construct($message, $code, $previous);
    } 
    
}

?>
