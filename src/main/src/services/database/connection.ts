import sqlite3 from 'sqlite3'

import { SQLiteDatabaseInstance } from '@main/types'

class ConnectionManager {
  public db: SQLiteDatabaseInstance

  constructor(databasePath: string) {
    this.db = new sqlite3.Database(databasePath)
  }

  public close(): void {
    this.db.close()
  }
}

export default ConnectionManager
