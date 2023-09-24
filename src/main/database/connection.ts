import sqlite3 from 'sqlite3'

class ConnectionManager {
  public db: sqlite3.Database

  constructor(databasePath: string) {
    this.db = new sqlite3.Database(databasePath)
  }

  public close(): void {
    this.db.close()
  }
}

export default ConnectionManager
