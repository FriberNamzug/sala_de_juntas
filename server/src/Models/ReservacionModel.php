<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\DataBase\ConexionDB;

class ReservacionModel extends ConexionDB
{

    private static $id_reservacion;
    private static $id_sala;
    private static $hora_inicial;
    private static $hora_final;
    private static $fecha;

    //Este constructor es para cuando se crea una sala nueva
    public function __construct(array $data)
    {
        self::$id_reservacion = $data['id_reservacion'];
        self::$id_sala = $data['id_sala'];
        self::$hora_inicial = $data['hora_inicial'];
        self::$hora_final = $data['hora_final'];
        self::$fecha = $data['fecha'];
    }

    public static function getIdReservacion()
    {
        return self::$id_reservacion;
    }
    public static function getIdSala()
    {
        return self::$id_sala;
    }
    public static function getHoraInicial()
    {
        return self::$hora_inicial;
    }
    public static function getHoraFinal()
    {
        return self::$hora_final;
    }
    public static function getFecha()
    {
        return self::$fecha;
    }


    final public static function registrarReservacion()
    {
        try {
            $conexion = self::obtenerConexion();
            //validamos que exista una sala con el id_sala
            $query = $conexion->query("SELECT nombre,ubicacion FROM salas WHERE id_sala = " . self::getIdSala());
            if ($query->rowCount() <= 0) return ResponseHttp::status400("La sala no existe");

            //Validamos que no se cruce con otra reservacion en la misma sala en la misma fecha 
            $query = $conexion->query("SELECT id_reservacion FROM reservaciones WHERE id_sala = " . self::getIdSala() . " AND fecha = '" . date("Y-m-d", strtotime(self::getFecha())) . "' AND hora_inicial <= '" . self::getHoraFinal() . "' AND hora_final >= '" . self::getHoraInicial() . "'");
            if ($query->rowCount() > 0) return ResponseHttp::status400("La sala ya esta reservada en ese horario");

            $query = $conexion->prepare("INSERT INTO reservaciones(id_sala, hora_inicial, hora_final, fecha) VALUES(:id_sala, :hora_inicial, :hora_final, :fecha)");
            $query->execute([
                ':id_sala' => self::getIdSala(),
                ':hora_inicial' => self::getHoraInicial(),
                ':hora_final' => self::getHoraFinal(),
                ':fecha' => date("Y-m-d", strtotime(self::getFecha()))
            ]);
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200("Reservacion creada con exito");
            } else {
                return ResponseHttp::status400("No se pudo registrar la reservacion");
            }
        } catch (\PDOException $e) {
            error_log("ReservacionModel::RegistrarReservacion -> " . $e);
            die(json_encode(ResponseHttp::status500()));
        }
    }

    final public static function actualizarReservacion()
    {
        try {
            $conexion = self::obtenerConexion();

            //validamos que exista una reservacion con el id_reservacion
            $query = $conexion->query("SELECT id_reservacion FROM reservaciones WHERE id_reservacion = " . self::getIdReservacion());
            if ($query->rowCount() <= 0) return ResponseHttp::status400("La reservacion no existe");

            //Validamos que todos los datos sean diferentes a los que ya tiene la reservacion
            $query = $conexion->query("SELECT id_reservacion FROM reservaciones WHERE id_reservacion = " . self::getIdReservacion() . " AND id_sala = " . self::getIdSala() . " AND hora_inicial = '" . self::getHoraInicial() . "' AND hora_final = '" . self::getHoraFinal() . "' AND fecha = '" . date("Y-m-d", strtotime(self::getFecha())) . "'");
            if ($query->rowCount() > 0) return ResponseHttp::status400("No se han realizado cambios");

            //validamos que exista una sala con el id_sala
            $query = $conexion->query("SELECT nombre,ubicacion FROM salas WHERE id_sala = " . self::getIdSala());
            if ($query->rowCount() <= 0) return ResponseHttp::status400("La sala no existe");

            //Validamos que no se cruce con otra reservacion en la misma sala en la misma fecha y que no sea la misma reservacion
            $query = $conexion->query("SELECT id_reservacion FROM reservaciones WHERE id_sala = " . self::getIdSala() . " AND fecha = '" . date("Y-m-d", strtotime(self::getFecha())) . "' AND hora_inicial <= '" . self::getHoraFinal() . "' AND hora_final >= '" . self::getHoraInicial() . "' AND id_reservacion != " . self::getIdReservacion());
            if ($query->rowCount() > 0) return ResponseHttp::status400("La sala ya esta reservada en ese horario");

            $query = $conexion->prepare("UPDATE reservaciones SET id_sala = :id_sala, hora_inicial = :hora_inicial, hora_final = :hora_final, fecha = :fecha WHERE id_reservacion = :id_reservacion");
            $query->execute([
                ':id_sala' => self::getIdSala(),
                ':hora_inicial' => self::getHoraInicial(),
                ':hora_final' => self::getHoraFinal(),
                ':fecha' => date("Y-m-d", strtotime(self::getFecha())),
                ':id_reservacion' => self::getIdReservacion()
            ]);
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200("Reservacion actualizada con exito");
            } else {
                return ResponseHttp::status400("No se pudo actualizar la reservacion");
            }
        } catch (\PDOException $e) {
            error_log("ReservacionModel::ActualizarReservacion -> " . $e);
            die(json_encode(ResponseHttp::status500()));
        }
    }

    final public static function eliminarReservacion($id)
    {
        try {
            $conexion = self::obtenerConexion();

            //validamos que exista una reservacion con el id_reservacion
            $query = $conexion->query("SELECT id_reservacion FROM reservaciones WHERE id_reservacion = " . $id);
            if ($query->rowCount() <= 0) return ResponseHttp::status400("La reservacion no existe");

            $query = $conexion->prepare("DELETE FROM reservaciones WHERE id_reservacion = :id_reservacion");
            $query->execute([
                ':id_reservacion' => $id
            ]);
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200("Reservacion eliminada con exito");
            } else {
                return ResponseHttp::status400("No se pudo eliminar la reservacion");
            }
        } catch (\PDOException $e) {
            error_log("ReservacionModel::EliminarReservacion -> " . $e);
            die(json_encode(ResponseHttp::status500()));
        }
    }

    final public static function listarReservaciones()
    {
        try {
            $conexion = self::obtenerConexion();

            $query = $conexion->query("SELECT reservaciones.id_reservacion, salas.nombre, salas.ubicacion, reservaciones.hora_inicial, reservaciones.hora_final, reservaciones.fecha FROM reservaciones INNER JOIN salas ON reservaciones.id_sala = salas.id_sala");

            if ($query->rowCount() > 0) {
                return ResponseHttp::status200($query->fetchAll(\PDO::FETCH_ASSOC));
            } else {
                return ResponseHttp::status400("No hay reservaciones");
            }
        } catch (\PDOException $e) {
            error_log("ReservasionModel::ListarReservaciones -> " . $e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
        }
    }
}
