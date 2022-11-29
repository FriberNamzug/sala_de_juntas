<?php

namespace App\Controllers;

use App\Config\ResponseHttp;
use App\Models\ReservacionModel;
use Valitron\Validator as V;


class ReservacionController extends HttpController
{

    final public function registrarReservacion(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            $v = new V($this->getParam());
            $v->rule('required', ['id_sala', 'fecha', 'hora_inicial', 'hora_final']); //Validamos que los campos no esten vacios
            $v->rule('integer', 'id_sala'); //Validamos que el id_sala sea un numero entero

            $v->rule('date', 'fecha', ['d-m-Y']); //Validamos que la fecha este en formato dd-mm-yyyy
            $v->rule('regex', ['hora_inicial', 'hora_final'], '/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/'); //Validamos que la hora este en formato hh:mm


            $v->rule('dateAfter', 'fecha', date('d-m-Y', strtotime('-1 day'))); //Validamos que la fecha sea mayor a la actual

            if (date('d-m-Y') == $this->getParam()['fecha']) { //Si la fecha es la actual
                if ($this->getParam()['hora_inicial'] < date('H:i')) { //la hora de inicio es menor a la hora actual
                    echo json_encode(ResponseHttp::status400("La hora de inicio no puede ser menor a la hora actual"));
                    exit;
                }
            }

            $v->rule('dateAfter', 'hora_final', $this->getParam()['hora_inicial']); //Validamos que la hora final sea mayor a la hora inicial
            if ((strtotime($this->getParam()['hora_final']) - strtotime($this->getParam()['hora_inicial'])) > 7200) { //Validamos que la diferencia entre las horas no sea mayor a 2 horas
                echo json_encode(ResponseHttp::status400("La hora final no puede ser mayor a 2 horas de la hora inicial"));
                exit;
            }

            if ($v->validate()) {
                new ReservacionModel($this->getParam());
                echo json_encode(ReservacionModel::registrarReservacion());
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }
            exit;
        }
    }

    final public function actualizarReservacion(string $endPoint)
    {
        if ($this->getMethod() == 'put' && $endPoint == $this->getRoute()) {
            $v = new V($this->getParam());
            $v->rule('required', ['id_reservacion', 'id_sala', 'fecha', 'hora_inicial', 'hora_final']);
            $v->rule('integer', ['id_reservacion', 'id_sala']);
            $v->rule('date', 'fecha', ['d-m-Y']); //Validamos que la fecha este en formato dd-mm-yyyy
            $v->rule('regex', ['hora_inicial', 'hora_final'], '/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/'); //Validamos que la hora este en formato hh:mm

            $v->rule('dateAfter', 'fecha', date('d-m-Y', strtotime('-1 day'))); //Validamos que la fecha sea mayor a la actual

            if (date('d-m-Y') == $this->getParam()['fecha']) { //Si la fecha es la actual
                if ($this->getParam()['hora_inicial'] < date('H:i')) { //la hora de inicio es menor a la hora actual
                    echo json_encode(ResponseHttp::status400("La hora de inicio no puede ser menor a la hora actual"));
                    exit;
                }
            }

            $v->rule('dateAfter', 'hora_final', $this->getParam()['hora_inicial']); //Validamos que la hora final sea mayor a la hora inicial

            if ((strtotime($this->getParam()['hora_final']) - strtotime($this->getParam()['hora_inicial'])) > 7200) { //Validamos que la diferencia entre las horas no sea mayor a 2 horas
                echo json_encode(ResponseHttp::status400("La hora final no puede ser mayor a 2 horas de la hora inicial"));
                exit;
            }

            if ($v->validate()) {
                new ReservacionModel($this->getParam());
                echo json_encode(ReservacionModel::actualizarReservacion());
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }

            exit;
        }
    }

    final public function eliminarReservacion(string $endPoint)
    {
        if ($this->getMethod() == 'delete' && $endPoint == $this->getRoute()) {
            $id = $this->getAttribute()[1];
            $v = new V(['id_reservacion' => $id]);
            $v->rule('required', 'id_reservacion');
            $v->rule('integer', 'id_reservacion');

            if ($v->validate()) {
                echo json_encode(ReservacionModel::eliminarReservacion($id));
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }

            exit;
        }
    }

    final public function listarReservaciones(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            echo json_encode(ReservacionModel::listarReservaciones());
            exit;
        }
    }
}
