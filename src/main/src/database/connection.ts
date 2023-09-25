import sqlite3 from 'sqlite3'
import { TDatabase } from '$types/db'
class ConnectionManager {
  public db: TDatabase

  constructor(databasePath: string) {
    this.db = new sqlite3.Database(databasePath)
  }

  public close(): void {
    this.db.close()
  }
}

export default ConnectionManager
