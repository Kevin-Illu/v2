import ConnectionManager from './connection'
import QueryRunner from './queryRunner'

class Database {
  public connectionManager: ConnectionManager
  public queryRunner: QueryRunner

  constructor(databasePath: string) {
    this.connectionManager = new ConnectionManager(databasePath)
    this.queryRunner = new QueryRunner(this.connectionManager.db)
  }
}

export default Database
