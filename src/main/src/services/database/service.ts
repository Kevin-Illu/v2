import sqlite3 from 'sqlite3'
import { DatabaseRepository } from '../../repositories/database'

import { SQLiteDatabaseInstance, RunResult, SQLQuery, Service } from '@main/types'

export class DatabaseService implements Service {
  public name = 'database'
  public db!: SQLiteDatabaseInstance

  constructor(private databasePath: string) {}

  public initialize = (): void => {
    console.log('....')
    console.log('initializing database')

    this.db = new sqlite3.Database(this.databasePath)
    const repository = new DatabaseRepository(this)

    // inicializa las tablas y los datos si no se han creado
    console.log('checking first launch')
    repository.checkFirstLaunch().then((firstLaunch) => {
      console.log('is first launch: ', firstLaunch)

      if (firstLaunch) {
        console.log('initializing database schema')

        repository.setupDatabaseSchema()
        repository.populateTables()
      }

      console.log('database initialized successfully')
    })
  }

  public cleanup = (): void => {
    this.db.close()
  }

  // transaction methods
  public runSerialQueries = (queries: SQLQuery[]): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION')

        queries.forEach((query) => {
          this.db.run(query)
        })

        this.db.run('COMMIT', (err: Error | null) => {
          if (err) {
            // En caso de error, hacemos rollback
            this.db.run('ROLLBACK')
            reject(false)
          } else {
            resolve(true)
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
