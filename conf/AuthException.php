<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AuthException
 *
 * @author bastieneichenberger
 */
class AuthException extends Exception{
    
    public function __construct($message, $code, $previous = NULL) {
        parent::__construct($message, $code, $previous);
    } 
    
}

?>
