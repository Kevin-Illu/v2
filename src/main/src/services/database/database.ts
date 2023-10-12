import sqlite3 from 'sqlite3'
import { SQLiteDatabaseInstance, RunResult, SQLQuery, Service } from '@main/types'

class DatabaseService implements Service {
  public name = 'database'
  public db!: SQLiteDatabaseInstance

  constructor(private databasePath: string) {}

  public initialize = (): void => {
    this.db = new sqlite3.Database(this.databasePath)
  }

  public cleanup = (): void => {
    this.db.close()
  }

  // transaction methods
  public runSerialQueries = (queries: SQLQuery[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION')

        queries.forEach((query) => {
          this.db.run(query)
        })

        this.db.run('COMMIT', (err: Error | null) => {
          if (err) {
            // En caso de error, hacemos rollback
            this.db.run('ROLLBACK')
            reject(err)
          } else {
            resolve()
          }
        })
      })
    })
  }

  public fetch = <T>(query: SQLQuery, params: any[] = []): Promise<T[]> => {
    return new Promise<T[]>((resolve, reject) => {
      this.db.all<T>(query, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  public execute = (query: SQLQuery, params: any[] = []): Promise<RunResult> => {
    return new Promise<RunResult>((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err)
        } else {
          // Retorna información sobre la última operación (ID de inserción, cambios realizados, etc.)
          resolve({ lastID: this.lastID, changes: this.changes })
        }
      })
    })
  }
}

export default DatabaseService
