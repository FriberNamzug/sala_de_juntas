<?php

use App\Config\ErrorLog;
use App\Config\ResponseHttp;
use Valitron\Validator as V;

require './vendor/autoload.php';
//Configuracion del validador de datos
V::langDir(__DIR__ . "/vendor/vlucas/valitron/lang");
V::lang('es');
//Configuracion de la respuesta http
header("Content-type: application/json; charset=utf-8");
//Cors para permitir el acceso a la api desde cualquier origen, ////////////////solo para pruebas///////////////////////////
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    die();
}

ErrorLog::activarErrorLog();

if (isset($_GET['route'])) {

    $params = explode('/', $_GET['route']);
    $list = ['salas', 'reservaciones']; //Rutas permitidas
    $file = './src/Routes/' . $params[0] . '.php'; //Ruta del archivo

    if (!in_array($params[0], $list)) { //Si la ruta no esta en la lista
        echo json_encode(ResponseHttp::status400());
        exit;
    }

    if (is_readable($file)) { //Si el archivo existe
        require $file;
        exit;
    } else { //
        echo json_encode(ResponseHttp::status500('El archivo de la ruta no esta creado'));
    }
} else {
    echo json_encode(ResponseHttp::status500());
    exit;
}
