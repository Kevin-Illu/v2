import { ipcMain } from 'electron'

interface ICommunicationService {
  handleAction?: (channel: string, callback: (args?: any) => void) => void
}

abstract class CommunicationService implements ICommunicationService {
  public handleAction(chanel: string, callback): void {
    ipcMain.handle(chanel, async (e, args) => {
      return await callback(args)
    })
  }
}

export default CommunicationService
