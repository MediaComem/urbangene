<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Feature
 *
 * @author bastieneichenberger
 */
class Feature
{
	var $type;
	var $geometry;
	var $id;
	
	function Feature($id,$geom) {
		$this->type = "Feature";
		$this->geometry = $geom;
		$this->id = $id;
	}
}

?>
