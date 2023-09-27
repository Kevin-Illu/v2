import { SQLQuery, SQLiteDatabaseInstance } from '@main/types'

class QueryRunner {
  public db: SQLiteDatabaseInstance

  constructor(db: SQLiteDatabaseInstance) {
    this.db = db
  }

  // ejecuta una lista de queries, es como un context en las que cada
  // querie tiene accesso a los cambios de los queries anteriores
  public runSerializeQueries(queries: SQLQuery[]): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<void>((resolve, _) => {
      this.db.serialize(() => {
        queries.forEach((query) => {
          this.db.run(query)
        })

        resolve()
      })
    })
  }

  // retorna el resultado de una consulta select
  // retorna una promesa que al resolverse retorna un array de <T>
  public fetch<T>(query: SQLQuery): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows: T) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

export default QueryRunner
