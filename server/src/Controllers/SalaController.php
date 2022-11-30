<?php

namespace App\Controllers;

use App\Config\ResponseHttp;
use App\Models\SalaModel;
use Valitron\Validator as V;


class SalaController extends HttpController
{

    final public function registrarSala(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            $v = new V($this->getParam()); //El metodo getParam() es de la clase HttpController para obtener los parametros
            $v->rule('required', ['nombre', 'ubicacion']);
            //Validamos que solo tenga letras numeros y espacios
            $v->rule('regex', ['nombre', 'ubicacion'], '/^[a-zA-Z0-9 ]+$/');

            $v->rule('lengthMin', ['nombre', 'ubicacion'], 1);
            $v->rule('lengthMax', ['nombre', 'ubicacion'], 30);

            if ($v->validate()) {
                new SalaModel($this->getParam());
                echo json_encode(SalaModel::registrarSala());
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }

            exit;
        }
    }

    final public function actualizarSala(string $endPoint)
    {
        if ($this->getMethod() == 'put' && $endPoint == $this->getRoute()) {
            $v = new V($this->getParam());
            $v->rule('required', ['id_sala', 'nombre', 'ubicacion']);
            $v->rule('integer', 'id_sala');
            $v->rule('regex', ['nombre', 'ubicacion'], '/^[a-zA-Z0-9 ]+$/');
            $v->rule('lengthMin', ['nombre', 'ubicacion'], 1);
            $v->rule('lengthMax', ['nombre', 'ubicacion'], 30);

            if ($v->validate()) {
                new SalaModel($this->getParam());
                echo json_encode(SalaModel::actualizarSala());
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }
            exit;
        }
    }

    final public function eliminarSala(string $endPoint)
    {
        if ($this->getMethod() == 'delete' && $endPoint == $this->getRoute()) {
            $id = $this->getAttribute()[1];
            $v = new V(['id_sala' => $id]);
            $v->rule('required', 'id_sala');
            $v->rule('integer', 'id_sala');

            if ($v->validate()) {
                echo json_encode(SalaModel::eliminarSala($id));
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }
            exit;
        }
    }

    final public function listarSalas(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            echo json_encode(SalaModel::listarSalas());
            exit;
        }
    }

    final public function listarSala(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            $id = $this->getAttribute()[1];
            $v = new V(['id_sala' => $id]);
            $v->rule('required', 'id_sala');
            $v->rule('integer', 'id_sala');

            if ($v->validate()) {
                echo json_encode(SalaModel::listarSala($id));
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }
            exit;
        }
    }

    final public function buscarSalaSinReservar(string $endPoint)
    {
        if ($this->getMethod() == 'post' && $endPoint == $this->getRoute()) {
            $v = new V($this->getParam());
            $v->rule('required', ['fecha', 'hora_inicial', 'hora_final']);

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
                echo json_encode(SalaModel::buscarSalaSinReservar($this->getParam()));
            } else {
                echo json_encode(ResponseHttp::status400(json_encode($v->errors())));
            }
            exit;
        }
    }
}
