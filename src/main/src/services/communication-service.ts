import { ipcMain } from 'electron'
import { ICommunicationService } from '@main/types'

abstract class CommunicationService implements ICommunicationService {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  public handleAction(chanel: string, callback): void {
    ipcMain.handle(chanel, async (e, args) => {
      const result = await callback(args)
      return result
    })
  }

  // Override this method
  public initialize(): void {}

  // TODO: implementar esto apropiadamente :c
  public cleanup(chanel: string = ''): void {
    if (chanel === '') return

    ipcMain.removeHandler(chanel)
  }
}

export default CommunicationService
