import { ipcMain } from 'electron'

interface ICommunication {
  handleAction?: (channel: string, callback: (args?: any) => void) => void
}

abstract class CommunicationService implements ICommunication {
  public handleAction(chanel: string, callback): void {
    ipcMain.handle(chanel, async (e, args) => {
      return await callback(args)
    })
  }
}

export default CommunicationService
