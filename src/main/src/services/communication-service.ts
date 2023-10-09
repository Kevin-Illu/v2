import { ipcMain } from 'electron'

interface ICommunication {
  /**
   * Maneja una acción específica en un canal de comunicación.
   * @param channel - El canal en el que se recibe la acción.
   * @param callback - La función de devolución de llamada que se ejecuta cuando se recibe la acción.
   */
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
