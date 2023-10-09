import { ActionMap, ICommunicationService, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'
import { Action, SettignsActions } from '$globalTypes/comunication'
import { HotKey } from '$globalTypes/globals'

export class SettingsService extends CommunicationService implements ICommunicationService {
  public name: string
  private _db: MainDatabaseInstance
  public _actions: ActionMap<SettignsActions>

  constructor(db: MainDatabaseInstance, name: string) {
    super()
    this.name = name
    this._db = db

    this._actions = {
      ['get-hotkeys']: {
        dispatch: this.getHotKeys
      }
    }
  }

  public getHotKeys = (): Promise<HotKey[]> => {
    // return this._db.queryRunner.fetch<HotKey[]>('SELECT * FROM hotkey')
    return this._db.queryRunner.fetch<HotKey>('SELECT * FROM hotkey')
  }

  public _dispatcher = <SettingsActions>(action: Action<SettingsActions>): Promise<void> => {
    const actionName = action.name as string

    if (action.payload) {
      return this._actions[actionName].dispatch(action.payload)
    }

    return this._actions[actionName].dispatch()
  }

  initialize = (): void => {
    console.log('initializing SettingsService')
    this.handleAction('services:settings', this._dispatcher)
  }

  cleanup = (): void => {
    console.log('close SettingsService')
  }
}
