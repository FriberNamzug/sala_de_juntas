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
}
