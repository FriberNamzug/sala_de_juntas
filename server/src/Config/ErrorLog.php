<?php

namespace App\Config;

date_default_timezone_set('America/Mexico_city');

class ErrorLog
{
    public static function activarErrorLog()
    {
        error_reporting(E_ALL);
        ini_set('ignore_repeated_errors', TRUE);
        ini_set('display_errors', FALSE);
        ini_set('log_errors', TRUE);
        ini_set('error_log', dirname(__DIR__) . '/Logs/php-error.log');
    }
}
