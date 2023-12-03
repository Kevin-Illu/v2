import { MainDatabaseInstance } from '@main/types'

interface IRepository {
  checkFirstLaunch: () => Promise<boolean>
  setupDatabaseSchema: () => void
  populateTables: () => void
}

interface table {
  create: string
  default_values?: string
}

export class DatabaseRepository implements IRepository {
  private tables: { [key: string]: table }
  constructor(private db: MainDatabaseInstance) {
    this.tables = {
      user: {
        create: `
          CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
          )`
      },
      states: {
        create: `
          CREATE TABLE IF NOT EXISTS states (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL
          )`,
        default_values: `
            INSERT INTO states (name, description)
            VALUES ("Active", "Things are happening!"),
            ("To-do", "Things to do"),
            ("Waiting", "Waiting for something else"),
            ("Canceled", "Never going to happen"),
            ("Deferred", "Put off until tomorrow"),
            ("Completed", "Things are done!")`
      },
      todos: {
        create: `
          CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            user_id INTEGER NOT NULL,
            state_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT NULL,
            archived BOOLEAN NOT NULL DEFAULT 0,
            created_date DATETIME NOT NULL,
            steps_id INTEGER NULL,
            parent_step_id ITEGER NULL,
          FOREIGN KEY (user_id) REFERENCES user(id),
          FOREIGN KEY (state_id) REFERENCES states(id)
        )`
      },
      steps: {
        create: `
          CREATE TABLE IF NOT EXISTS steps (
            id INTEGER NOT NULL,
            todo_id INTEGER NOT NULL,
            description TEXT,
            completed BOOLEAN NOT NULL DEFAULT 0,
            archived BOOLEAN NOT NULL DEFAULT 0,
            name TEXT NOT NULL, parent_step_id INTEGER NULL,
          FOREIGN KEY("todo_id") REFERENCES "todos"("id"),
          PRIMARY KEY("id" AUTOINCREMENT)
        )`
      },
      global_config: {
        create: `
          CREATE TABLE IF NOT EXISTS global_config (
            key TEXT PRIMARY KEY,
            value TEXT NULL,
            description TEXT NULL
          )`,
        default_values: `
          INSERT INTO global_config (key, value, description)
          VALUES ("initialized", "true", "indica si la aplicacion se inicializo con los datos por default"),
          ("main_user_id", NULL, "id del usuario principal")
        `
      }
    }
  }

  /*
   * retorna true si es el primer launch
   * de lo contrario false
   */
  public checkFirstLaunch = (): Promise<boolean> =>
    this.db
      .fetch<{ value: string }>("SELECT value FROM global_config WHERE key = 'initialized'")
      .then((result) => {
        const { value } = result[0]
        return value !== 'true'
      })
      .catch(() => true)

  public setupDatabaseSchema = (): void => {
    const { user, states, todos, steps, global_config } = this.tables

    this.db
      .runSerialQueries([
        user.create,
        states.create,
        todos.create,
        steps.create,
        global_config.create
      ])
      .then(() => console.log('setup database successfully'))
      .catch((error) => console.error('setup database failed', error))
  }

  public populateTables = (): void => {
    const { states, global_config } = this.tables

    this.db
      .runSerialQueries([states.default_values!, global_config.default_values!])
      .then(() => console.log('populated successfully'))
      .catch((error) => console.error('populated failed', error))
  }
}
