<?php

namespace App\Models;

use App\Config\ResponseHttp;
use App\DataBase\ConexionDB;

class SalaModel extends ConexionDB
{

    private static $id_sala;
    private static $nombre;
    private static $ubicacion;

    //Este constructor es para cuando se crea una sala nueva
    public function __construct(array $data)
    {
        self::$id_sala = $data['id_sala'];
        self::$nombre = $data['nombre'];
        self::$ubicacion = $data['ubicacion'];
    }

    public static function getNombre()
    {
        return self::$nombre;
    }
    public static function getUbicacion()
    {
        return self::$ubicacion;
    }
    public static function getIdSala()
    {
        return self::$id_sala;
    }


    final public static function registrarSala()
    {
        try {
            $conexion = self::obtenerConexion();
            $query = $conexion->prepare("INSERT INTO salas(nombre, ubicacion) VALUES(:nombre, :ubicacion)");
            $query->execute([
                ':nombre' => self::getNombre(),
                ':ubicacion' => self::getUbicacion(),
            ]);
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200("Sala creada con exito");
            } else {
                return ResponseHttp::status400("No se pudo registrar la sala");
            }
        } catch (\PDOException $e) {
            error_log("SalaModel::RegistrarSala -> " . $e);
            die(json_encode(ResponseHttp::status500()));
        }
    }

    final public static function actualizarSala()
    {
        try {
            $conexion = self::obtenerConexion();
            //Comprobamos que la sala exista
            $query = $conexion->query("SELECT nombre,ubicacion FROM salas WHERE id_sala = " . self::getIdSala());
            if ($query->rowCount() <= 0) return ResponseHttp::status400("La sala no existe");

            //Comprobamos que los datos sean diferentes
            $sala = $query->fetchAll()[0];
            if ($sala['nombre'] == self::getNombre() && $sala['ubicacion'] == self::getUbicacion()) return ResponseHttp::status200("Sin cambios");

            //Actualizamos los datos
            $query = $conexion->prepare("UPDATE salas SET nombre = :nombre, ubicacion = :ubicacion WHERE id_sala = :id_sala");
            $query->execute([
                ':id_sala' => self::$id_sala,
                ':nombre' => self::getNombre(),
                ':ubicacion' => self::getUbicacion(),
            ]);
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200("Sala actualizada con exito");
            } else {
                return ResponseHttp::status400("No se pudo actualizar la sala");
            }
        } catch (\PDOException $e) {
            error_log("SalaModel::ActualizarSala -> " . $e);
            die(json_encode(ResponseHttp::status500()));
        }
    }

    final public static function eliminarSala($id)
    {
        try {
            $conexion = self::obtenerConexion();

            $query = $conexion->query("SELECT id_sala FROM salas WHERE id_sala = " . $id);
            if ($query->rowCount() <= 0) return ResponseHttp::status400("La sala no existe");

            $query = $conexion->prepare("DELETE FROM salas WHERE id_sala = :id_sala");
            $query->execute([
                ':id_sala' => $id,
            ]);

            if ($query->rowCount() > 0) {
                return ResponseHttp::status200("Sala eliminada con exito");
            } else {
                return ResponseHttp::status400("No se pudo eliminar la sala");
            }
        } catch (\PDOException $e) {
            error_log("SalaModel::EliminarSala -> " . $e);
            die(json_encode(ResponseHttp::status500()));
        }
    }

    final public static function listarSalas()
    {
        try {
            $conexion = self::obtenerConexion();
            $query = $conexion->query("SELECT id_sala,nombre,ubicacion FROM salas");
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200($query->fetchAll());
            } else {
                return ResponseHttp::status400("No hay salas registradas");
            }
        } catch (\PDOException $e) {
            error_log("SalaModel::ListarSalas -> " . $e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
        }
    }

    final public static function listarSala($id)
    {
        try {
            $conexion = self::obtenerConexion();
            $query = $conexion->query("SELECT reservaciones.id_reservacion, salas.nombre,salas.id_sala, salas.ubicacion, reservaciones.hora_inicial, reservaciones.hora_final, reservaciones.fecha FROM reservaciones INNER JOIN salas ON reservaciones.id_sala = salas.id_sala WHERE salas.id_sala = " . $id . " AND reservaciones.status = 1");
            if ($query->rowCount() > 0) {
                return ResponseHttp::status200($query->fetchAll());
            } else {
                return ResponseHttp::status400("No existen reservaciones para esta sala");
            }
        } catch (\PDOException $e) {
            error_log("SalaModel::ListarSala -> " . $e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
        }
    }

    final public static function buscarSalaSinReservar($params)
    {
        try {
            $conexion = self::obtenerConexion();
            if ($params['id_reservacion']) {

                $query = $conexion->query("SELECT id_reservacion FROM reservaciones WHERE id_reservacion = " . $params['id_reservacion']);
                if ($query->rowCount() <= 0) return ResponseHttp::status400("La reservacion no existe");

                $query = $conexion->query("SELECT salas.id_sala, salas.nombre, salas.ubicacion FROM salas WHERE salas.id_sala NOT IN (SELECT reservaciones.id_sala FROM reservaciones WHERE reservaciones.fecha = '" .  date("Y-m-d", strtotime($params['fecha'])) . "' AND reservaciones.hora_inicial <= '" . $params['hora_final'] . "' AND reservaciones.hora_final >= '" . $params['hora_inicial'] . "' AND reservaciones.id_reservacion != '" . $params['id_reservacion'] . "')");
                if ($query->rowCount() > 0) {
                    return ResponseHttp::status200($query->fetchAll());
                } else {
                    return ResponseHttp::status400("No hay salas disponibles");
                }
            } else {
                $query = $conexion->query("SELECT salas.id_sala, salas.nombre, salas.ubicacion FROM salas WHERE salas.id_sala NOT IN (SELECT reservaciones.id_sala FROM reservaciones WHERE reservaciones.fecha = '" .  date("Y-m-d", strtotime($params['fecha'])) . "' AND reservaciones.hora_inicial <= '" . $params['hora_final'] . "' AND reservaciones.hora_final >= '" . $params['hora_inicial'] . "')");
                if ($query->rowCount() > 0) {
                    return ResponseHttp::status200($query->fetchAll());
                } else {
                    return ResponseHttp::status400("No hay salas disponibles");
                }
            }
        } catch (\PDOException $e) {
            error_log("SalaModel::BuscarSalaSinReservar -> " . $e);
            die(json_encode(ResponseHttp::status500('No se pueden obtener los datos')));
        }
    }
}
