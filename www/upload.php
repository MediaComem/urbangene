<?php

// A list of permitted file extensions
$allowed = array('png', 'jpg', 'gif', 'jpeg');

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){

	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);
	$timestamp = date('Y-m-d-G-i-s-u');
	$name = $timestamp.'.'.$extension;

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}

	if(move_uploaded_file($_FILES['upl']['tmp_name'], 'uploads/'.$name)){
		echo '{"status":"success","name":"'.$name.'"}';
		exit;
	}
}

echo '{"status":"error"}';
exit;