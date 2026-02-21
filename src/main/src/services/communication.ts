import { ipcMain } from 'electron'

type HandleCallback<TArgs = unknown, TResult = unknown> = (
  args: TArgs
) => Promise<TResult> | TResult

interface ICommunicationService {
  handleAction<TArgs = unknown, TResult = unknown>(
    channel: string,
    callback: HandleCallback<TArgs, TResult>
  ): void
}

abstract class CommunicationService implements ICommunicationService {
  public handleAction<TArgs = unknown, TResult = unknown>(
    channel: string,
    callback: HandleCallback<TArgs, TResult>
  ): void {
    ipcMain.handle(channel, async (_event, args: TArgs) => {
      return await callback(args)
    })
  }
}

export default CommunicationService
