<?php

use App\Config\ErrorLog;
use App\Config\ResponseHttp;

require './vendor/autoload.php';

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
