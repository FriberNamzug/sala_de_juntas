# Aplicacion para una sala de juntas

## Descripcion

Aplicacion para administrar una sala de juntas la cual tiene como requerimientos:

- Crear una sala de juntas.
- Actualizar una sala de juntas.
- Eliminar una sala de juntas.
- Listar todas las salas de juntas.
- Listar una sala de juntas con su respectiva informacion (nombre, ubicacion, reservaciones, etc)

- Crear una reservacion para una sala de juntas.
- Actualizar una reservacion para una sala de juntas.
- Eliminar una reservacion para una sala de juntas.

Limitaciones:

- No se puede reservar una sala de juntas si esta ya esta reservada en ese rango de tiempo y fecha
- No se puede reservar una sala de juntas por mas de 2 horas
- No se puede reservar una sala de juntas si la fecha de la reservacion es menor a la fecha actual

## Tecnologias

Se decidio utilizar para el desarrollo del cliente el framework de ReactJS, para el desarrollo del servidor se utilizara PHP con composer y para la base de datos se utilizara MySQL.

Ademas se utilizara servicios de terceros como:

- [proceso](proceso) para el despliegue del servidor
- [proceso](proceso) para el despliegue de la base de datos
- [proceso](proceso) para el despliegue del cliente
- [GitHub]([...]) para el control de versiones

## Informacion de la aplicacion

### Servidor

El servidor se encuentra en la carpeta `server` y se encuentra desarrollado en PHP.
El servidor se encarga de recibir las peticiones del cliente y realizar las operaciones necesarias para responder a las peticiones.

Los endpoints que se utilizan son:

- `GET /salas/` para obtener todas las salas de juntas
- `GET /salas/:id_sala/` para obtener una sala de juntas con sus reservaciones
- `POST /salas/` para crear una sala de juntas {nombre, ubicacion}
- `PUT /salas/:id_sala/` para actualizar una sala de juntas {id_sala, nombre, ubicacion}
- `DELETE /salas/:id_sala/` para eliminar una sala de juntas
- `GET /reservaciones/` para obtener todas las reservaciones
- `POST /reservaciones/` para crear una reservacion {id_sala, fecha, hora_inicial, hora_final}
- `PUT /reservaciones/:id_reservacion/` para actualizar una reservacion {id_reservacion, id_sala, fecha, hora_inicial, hora_final}
- `DELETE /reservaciones/:id_reservacion/` para eliminar una reservacion

### Base de datos

La base de datos se encuentra en la carpeta `database` y se encuentra desarrollada en MySQL.
La base de datos se encarga de almacenar la informacion de las salas de juntas y las reservaciones en dos tablas diferentes.

Las tablas que se utilizan son:

- `salas` para almacenar la informacion de las salas de juntas {id_sala(int), nombre(varchar), ubicacion(varchar)}
- `reservaciones` para almacenar la informacion de las reservaciones {id_reservacion(int), id_sala(int), fecha(date), hora_inicial(time), hora_final(time)}

### Cliente

El cliente se encuentra en la carpeta `client` y se encuentra desarrollado en ReactJS.
El cliente se encarga de mostrar la informacion de las salas de juntas y las reservaciones y de enviar las peticiones al servidor para realizar las operaciones necesarias.

Los componentes que se utilizan son:

- ...
