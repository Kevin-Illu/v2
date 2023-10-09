import { SQLiteDatabaseInstance, RunResult, SQLQuery } from '@main/types'

class QueryRunner {
  public db: SQLiteDatabaseInstance

  constructor(db: SQLiteDatabaseInstance) {
    this.db = db
  }

  // Ejecuta una lista de consultas en serie. Cada consulta se ejecuta
  // después de la anterior, lo que permite transacciones.
  public runSerialQueries = (queries: SQLQuery[]): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run('BEGIN TRANSACTION')

        queries.forEach((query) => {
          this.db.run(query)
        })

        this.db.run('COMMIT', (err: Error | null) => {
          if (err) {
            this.db.run('ROLLBACK') // En caso de error, hacemos rollback
            reject(err)
          } else {
            resolve()
          }
        })
      })
    })
  }

  // Ejecuta una consulta SELECT y retorna los resultados.
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

  // Ejecuta una consulta INSERT o UPDATE y retorna el resultado.
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

export default QueryRunner
