import ConnectionManager from './connection'
import QueryRunner from './queryRunner'
import TableManager from './tableManager'

class Database {
  public connectionManager: ConnectionManager
  public queryRunner: QueryRunner
  public tableManager: TableManager

  constructor(databasePath: string) {
    this.connectionManager = new ConnectionManager(databasePath)
    this.queryRunner = new QueryRunner(this.connectionManager.db)
    this.tableManager = new TableManager(this.connectionManager.db)
  }

  async initilizeTables(): Promise<void> {
    await this.tableManager.createTable(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT,
      completed BOOLEAN
    )
    `)
  }
}

export default Database
