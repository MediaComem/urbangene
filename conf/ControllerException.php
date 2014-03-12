<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControllerException
 *
 * @author bastieneichenberger
 */
class ControllerException extends Exception{
    
    public function __construct($message, $code, $previous = NULL) {
        parent::__construct($message, $code, $previous);
    } 
    
}

?>
