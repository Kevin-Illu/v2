import { ActionMap, ICommunicationService, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'
import { ClientAction, SettignsActions } from '$globalTypes/comunication'
import { HotKey } from '$globalTypes/globals'

export class SettingsService extends CommunicationService implements ICommunicationService {
  public name: string = 'Settings'
  private db: MainDatabaseInstance
  public actions: ActionMap<SettignsActions>

  constructor(db: MainDatabaseInstance) {
    super()
    this.db = db

    this.actions = {
      ['get-hotkeys']: {
        dispatch: this.getHotKeys
      }
    }
  }

  public getHotKeys = (): Promise<HotKey[]> => {
    return this.db.fetch<HotKey>('SELECT * FROM hotkey')
  }

  public _dispatcher = <SettingsActions>(action: ClientAction<SettingsActions>): Promise<void> => {
    const type = action.type as string

    if (action.payload) {
      return this.actions[type].dispatch(action.payload)
    }

    return this.actions[type].dispatch()
  }

  initialize = (): void => {
    console.log('initializing SettingsService')
    this.handleAction('services:settings', this._dispatcher)
  }

  cleanup = (): void => {
    console.log('close SettingsService')
  }
}
