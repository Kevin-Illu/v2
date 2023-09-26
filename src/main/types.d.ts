import sqlite3 from 'sqlite3'
import Database from '@main/database/db'

// database types
type sqliteDatabase = sqlite3.Database
type Database = Database
type sqlQuery = string

// services
interface IService {
  handleAction: (chanel: string, callback) => void
}

// los servicios derivados tendran que tener
// obligatoriamente la propiedad actions
// ya que esta se utiliza para comunicarse
// con el render process
interface DerivedService extends IService {
  actions: Actions
}

// actions and dispatchers for comunication
// between main process and renderer process
type Actions = {
  [key: string]: {
    dispatch: (args?: any) => any
  }
}
