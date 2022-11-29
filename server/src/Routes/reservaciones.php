<?php

use App\Config\ResponseHttp;
use App\Controllers\ReservacionController;

$params  = explode('/', $_GET['route']);

$app = new ReservacionController();

$app->registrarReservacion("reservaciones/");
$app->actualizarReservacion("reservaciones/");
$app->eliminarReservacion("reservaciones/{$params[1]}/");
$app->listarReservaciones("reservaciones/");

echo json_encode(ResponseHttp::status404());
