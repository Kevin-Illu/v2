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
            state_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT NULL,
            archived BOOLEAN NOT NULL DEFAULT 0,
            created_date DATETIME NOT NULL,
          FOREIGN KEY (state_id) REFERENCES states(id)
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
          VALUES ("initialized", "true", "indica si la aplicacion se inicializo con los datos por default")
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
      .then((result: { value: string }) => {
        const { value } = result[0]
        return value !== 'true'
      })
      .catch(() => true)

  public setupDatabaseSchema = async (): Promise<void> => {
    const { states, todos, global_config } = this.tables

    return await this.db
      .runSerialQueries([states.create, todos.create, global_config.create])
      .then(() => console.log('setup database successfully'))
      .catch((error: any) => console.error('setup database failed', error))
  }

  public populateTables = async (): Promise<void> => {
    const { states, global_config } = this.tables

    return await this.db
      .runSerialQueries([states.default_values!, global_config.default_values!])
      .then(() => console.log('populated successfully'))
      .catch((error: any) => console.error('populated failed', error))
  }
}
