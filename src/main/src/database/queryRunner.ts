import { TDatabase, sqlQuery } from '$types/db'

class QueryRunner {
  public db: TDatabase

  constructor(db: TDatabase) {
    this.db = db
  }

  async runSerializeQueries(queries: sqlQuery[]): Promise<void> {
    return new Promise<void>((resolve, _) => {
      this.db.serialize(() => {
        queries.forEach((query) => {
          this.db.run(query)
        })

        resolve()
      })
    })
  }

  fetch<T>(query: sqlQuery): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows: T[]) => {
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
