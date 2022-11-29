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
            echo json_encode("Sala registrada con exito");
            exit;
        }
    }

    final public function actualizarSala(string $endPoint)
    {
        if ($this->getMethod() == 'put' && $endPoint == $this->getRoute()) {
            echo json_encode("Sala actualizada con exito");
            exit;
        }
    }

    final public function eliminarSala(string $endPoint)
    {
        if ($this->getMethod() == 'delete' && $endPoint == $this->getRoute()) {
            exit;
        }
    }

    final public function listarSalas(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            exit;
        }
    }

    final public function listarSala(string $endPoint)
    {
        if ($this->getMethod() == 'get' && $endPoint == $this->getRoute()) {
            exit;
        }
    }
}
