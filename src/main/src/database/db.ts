import ConnectionManager from './connection'
import QueryRunner from './queryRunner'

class Database {
  private connectionManager: ConnectionManager
  public queryRunner: QueryRunner

  constructor(databasePath: string) {
    this.connectionManager = new ConnectionManager(databasePath)
    this.queryRunner = new QueryRunner(this.connectionManager.db)
  }

  public disconnect(): void {
    this.connectionManager.close()
  }
}

export default Database
