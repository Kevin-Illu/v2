# Clase `DatabaseService`

La clase `DatabaseService` es una implementación de la interfaz `Service` que proporciona funcionalidad para gestionar la conexión y el acceso a una base de datos SQLite en una aplicación de Electron.

## Constructor

### `constructor(databasePath: string, name: string)`

- `databasePath` (string): La ruta al archivo de la base de datos SQLite.
- `name` (string): El nombre del servicio de base de datos.

Crea una nueva instancia de `DatabaseService` con la ruta de la base de datos y el nombre proporcionados.

## Propiedades

- `name` (string): El nombre del servicio de base de datos.
- `private databasePath` (string): La ruta al archivo de la base de datos.

## Métodos

### `initialize(): void`

Este método se utiliza para inicializar el servicio de base de datos. Debe llamarse antes de usar el servicio. Realiza las siguientes acciones:

1. Establece una conexión con la base de datos.
2. Inicializa el `queryRunner` para ejecutar consultas en la base de datos.

### `cleanup(): void`

Este método se utiliza para limpiar y cerrar el servicio de base de datos cuando ya no se necesita. Realiza las siguientes acciones:

1. Comprueba si la conexión (`connectionManager`) existe.
2. Si la conexión existe, la cierra.

**Nota**: Asegúrate de llamar a este método cuando hayas terminado de usar el servicio de base de datos para liberar recursos y cerrar la conexión.

## Propiedades Privadas

- `private connectionManager` (ConnectionManager): La instancia de `ConnectionManager` utilizada para gestionar la conexión a la base de datos.
- `public queryRunner` (QueryRunner): La instancia de `QueryRunner` utilizada para ejecutar consultas en la base de datos.

## Uso

```typescript
import DatabaseService from './DatabaseService';

// Crear una instancia de DatabaseService
const databaseService = new DatabaseService('ruta/a/la/base-de-datos.db', 'MiServicioDeBaseDeDatos');

// Inicializar el servicio de base de datos
databaseService.initialize();

// Realizar operaciones en la base de datos aquí

// Limpiar y cerrar el servicio de base de datos cuando ya no se necesita
databaseService.cleanup();
```

Esta documentación describe la funcionalidad y el uso básico de la clase `DatabaseService`. Asegúrate de llamar a `initialize` antes de interactuar con la base de datos y `cleanup` cuando hayas terminado de usar el servicio de base de datos.
