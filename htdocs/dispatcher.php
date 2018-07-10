<?php
session_start();
session_regenerate_id(true);

ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__FILE__) . '/error_log.txt');
error_reporting(E_ALL);

define('ROOT', '../');
require_once (ROOT . 'conf/conf.php');

require_once (ROOT . CONTROLLER_DIR . 'Controller_point.php');


if(isset($_GET['controller']) && isset($_GET['action']) ){
    $controller = $_GET['controller'];
    $action = $_GET['action'];
}


try {
    $className = 'Controller_' . $controller;
    $controllerInst = new $className();
    $controllerInst->$action();
} catch (Exception $e) {
    $error = new stdClass();
    $error->code = $e->getCode();
    $error->message = $e->getMessage();
    die(json_encode($error));
}



?>
