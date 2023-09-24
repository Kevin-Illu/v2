import { TDatabase, databaseQuery } from './database'

class TableManager {
  public db: TDatabase

  constructor(db: TDatabase) {
    this.db = db
  }

  async createTable(tableQuery: databaseQuery): Promise<void> {
    await this.db.run(tableQuery)
  }

  async dropTable(tableName: string): Promise<void> {
    await this.db.run(`DROP TABLE IF EXISTS ${tableName}`)
  }
}

export default TableManager
