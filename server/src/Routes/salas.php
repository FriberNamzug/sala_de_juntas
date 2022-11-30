<?php

use App\Config\ResponseHttp;
use App\Controllers\SalaController;

$params  = explode('/', $_GET['route']);

$app = new SalaController();

$app->registrarSala("salas/");
$app->actualizarSala("salas/");
$app->eliminarSala("salas/{$params[1]}/");
$app->listarSalas("salas/");
$app->listarSala("salas/{$params[1]}/");
$app->buscarSalaSinReservar("salas/buscar/sin-reservar/");

echo json_encode(ResponseHttp::status404());
