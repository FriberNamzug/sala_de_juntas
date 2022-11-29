<?php

namespace App\Config;

class ResponseHttp
{

    public static $message = array(
        'status' => '',
        'message' => ''
    );


    public static function status200($response)
    {
        http_response_code(200);
        self::$message['status'] = 'ok';
        self::$message['message'] = $response;
        return self::$message;
    }

    public static function status201(string $response = 'Se ha creado el recurso')
    {
        http_response_code(201);
        self::$message['status'] = 'ok';
        self::$message['message'] = $response;
        return self::$message;
    }

    public static function status400(string $response = 'La solicitud enviada es incompleta o en formato incorrecto')
    {
        http_response_code(400);
        self::$message['status'] = 'error';
        self::$message['message'] = $response;
        return self::$message;
    }

    public static function status404(string $response = 'El recurso solicitado no existe')
    {
        http_response_code(404);
        self::$message['status'] = 'error';
        self::$message['message'] = $response;
        return self::$message;
    }

    public static function status500(string $response = 'Error interno del servidor')
    {
        http_response_code(500);
        self::$message['status'] = 'error';
        self::$message['message'] = $response;
        return self::$message;
    }
}
