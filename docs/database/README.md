# Documentación de la Base de Datos de la Aplicación

Esta documentación describe la estructura de la base de datos utilizada en la aplicación y proporciona una visión general de cómo se utilizan las tablas.

## Tabla `user`

- **id**: Identificador único de usuario.
- **name**: Nombre del usuario.
- **email**: Dirección de correo electrónico del usuario.

Esta tabla almacena información sobre los usuarios de la aplicación.

## Tabla `state`

- **id**: Identificador único de estado.
- **name**: Nombre del estado.
- **description**: Descripción del estado.

La tabla `state` almacena diferentes estados que pueden aplicarse a las tareas en la aplicación, como "Activo", "Por hacer" o "Completado".

## Tabla `todos`

- **id**: Identificador único de la tarea.
- **user_id**: Clave externa que hace referencia al usuario que creó la tarea.
- **state_id**: Clave externa que hace referencia al estado actual de la tarea.
- **name**: Nombre o título de la tarea.
- **archived**: Booolean que indica si esta archivada o no
- **description**: Descripción opcional de la tarea.
- **created_date**: Fecha en que se creó la tarea.
- **created_time**: Hora en que se creó la tarea.

La tabla `todos` almacena las tareas creadas por los usuarios, relacionándolas con un estado y un usuario específicos.

## Tabla `priorities`

- **id**: Identificador único de prioridad.
- **name**: Nombre de la prioridad.

La tabla `priorities` almacena las prioridades que pueden aplicarse a las tareas, como "Alta", "Media" o "Baja".

## Tabla `labels`

- **id**: Identificador único de etiqueta.
- **name**: Nombre de la etiqueta.

La tabla `labels` almacena etiquetas que pueden aplicarse a las tareas para categorizarlas.

## Tabla `todo_labels`

- **todo_id**: Clave externa que hace referencia a la tarea a la que se asigna la etiqueta.
- **label_id**: Clave externa que hace referencia a la etiqueta asignada a la tarea.

La tabla `todo_labels` establece relaciones entre las tareas y las etiquetas asignadas a esas tareas.

## Tabla `todo_priorities`

- **todo_id**: Clave externa que hace referencia a la tarea a la que se asigna la prioridad.
- **priority_id**: Clave externa que hace referencia a la prioridad asignada a la tarea.

La tabla `todo_priorities` establece relaciones entre las tareas y las prioridades asignadas a esas tareas.

## Tabla `activity_log`

- **id**: Identificador único de la entrada de registro.
- **user_id**: Clave externa que hace referencia al usuario que realizó la acción.
- **action**: Descripción de la acción realizada.
- **timestamp**: Marca de tiempo que indica cuándo se realizó la acción.

La tabla `activity_log` registra las acciones realizadas en la aplicación, como la creación o modificación de tareas.
