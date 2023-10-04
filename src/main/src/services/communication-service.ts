import { ipcMain } from 'electron'
import { ActionMap } from '@main/types'

interface ICommunication {
  /**
   * Maneja una acción específica en un canal de comunicación.
   * @param channel - El canal en el que se recibe la acción.
   * @param callback - La función de devolución de llamada que se ejecuta cuando se recibe la acción.
   */
  handleAction?: (channel: string, callback: (args?: any) => void) => void
}

abstract class CommunicationService implements ICommunication {
  public name: string
  public _actions: ActionMap<any> = {}

  constructor(name: string) {
    this.name = name
  }

  public handleAction(chanel: string, callback): void {
    ipcMain.handle(chanel, async (e, args) => {
      const result = await callback(args)
      return result
    })
  }
}

export default CommunicationService
