import { TDatabase, sqlQuery } from './database'

class QueryRunner {
  public db: TDatabase

  constructor(db: TDatabase) {
    this.db = db
  }

  async run<T>(query: sqlQuery): Promise<T> {
    try {
      const result = (await this.db.run(query)) as T
      return result
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default QueryRunner
