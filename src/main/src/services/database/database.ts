import ConnectionManager from './connection'
import QueryRunner from './queryRunner'

import { Service } from '@main/types'

class DatabaseService implements Service {
  private connectionManager: ConnectionManager | undefined
  public queryRunner: QueryRunner | undefined

  public name: string
  private databasePath: string

  constructor(databasePath: string, name: string) {
    this.databasePath = databasePath
    this.name = name
  }

  public initialize(): void {
    // conect with the dabase
    console.log('initializing database service')
    this.connectionManager = new ConnectionManager(this.databasePath)
    this.queryRunner = new QueryRunner(this.connectionManager.db)
  }

  public cleanup(): void {
    if (this.connectionManager === undefined) return

    console.log('close database service')
    this.connectionManager.close()
  }
}

export default DatabaseService
