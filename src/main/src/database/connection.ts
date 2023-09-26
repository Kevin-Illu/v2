import sqlite3 from 'sqlite3'
import { sqliteDatabase } from '../../types'
class ConnectionManager {
  public db: sqliteDatabase

  constructor(databasePath: string) {
    this.db = new sqlite3.Database(databasePath)
  }

  public close(): void {
    this.db.close()
  }
}

export default ConnectionManager
