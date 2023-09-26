import { ipcMain } from 'electron'
import { Database, IService } from '../../types'

abstract class Service implements IService {
  // instacion de la clase Database
  public db: Database

  constructor(db: Database) {
    this.db = db
  }

  // maneja acciones que vienen del renderer process
  public handleAction(chanel: string, callback): void {
    ipcMain.handle(chanel, async (e, args) => {
      const result = await callback(args)
      return result
    })
  }
}

export default Service
