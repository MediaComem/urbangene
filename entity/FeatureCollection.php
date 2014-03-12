<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of FeatureCollection
 *
 * @author bastieneichenberger
 */
class FeatureCollection
{
	var $type;
	var $features;
	
	function FeatureCollection()
	{
		$this->type = "FeatureCollection";
		$this->features = array();
	}
	
	function addFeature($feature) {
		array_push($this->features,$feature);
	} 
}

?>
