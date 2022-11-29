<?php

namespace App\Controllers;

class HttpController
{

    protected function getMethod()
    {
        return strtolower($_SERVER['REQUEST_METHOD']);
    }

    protected function getRoute() // Nos obtiene la ruta
    {
        return $_GET['route'];
    }

    protected function getAttribute() //
    {
        $route = $this->getRoute();
        $params = explode('/', $route);
        return $params;
    }

    protected function getHeader(string $header)
    {
        $ContentType = getallheaders();
        return $ContentType[$header];
    }

    protected function getParam() //Nos obtiene los parametros enviados
    {
        if ($this->getHeader('Content-Type') == 'application/json') {
            $param = json_decode(file_get_contents("php://input"), true);
        } else {
            $param = $_POST;
        }
        return $param;
    }
}
