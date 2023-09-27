# SERVICES

A continuación, se describen todos los services usados en la aplicación.

## Service `Database`

El servicio `Database` se utiliza para gestionar la conexión y el acceso a una base de datos SQLite en la aplicación de Electron. Proporciona métodos para inicializar la conexión con la base de datos, ejecutar consultas y limpiar recursos cuando ya no se necesita.

Este servicio es esencial para cualquier funcionalidad que involucre el almacenamiento y recuperación de datos en la base de datos SQLite de la aplicación. Puedes encontrar más detalles en la [documentación del servicio Database](./database.md).

## Service `Communication`

El servicio `Communication` es una clase abstracta que proporciona una base común para servicios de comunicación en una aplicación de Electron. Implementa la interfaz `ICommunicationService` y ofrece métodos para manejar acciones y comunicarse entre el proceso principal y el proceso de renderizado.

Este servicio es fundamental para la comunicación efectiva entre diferentes partes de la aplicación. Puedes obtener más información sobre su implementación y uso en la [documentación del servicio Communication](./communication.md).

## Service `TodoService`

El servicio `TodoService` es un servicio de comunicación específico que se encarga de gestionar las acciones relacionadas con las tareas pendientes en la aplicación. Proporciona métodos para obtener estados y realizar acciones relacionadas con las tareas.

Para más detalles sobre su implementación y uso, consulta la [documentación del servicio `TodoService`](./todo.md).
