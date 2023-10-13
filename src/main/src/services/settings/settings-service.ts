import { ActionMap, ICommunication, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'
import { ClientAction, SettingsActions } from '$globalTypes/comunication'
import { SettingsRepository } from '@main/repositories/settings'

export class SettingsService extends CommunicationService implements ICommunication {
  public name = 'settings'
  public actions: ActionMap<SettingsActions>
  private SettingsRepo: SettingsRepository

  constructor(db: MainDatabaseInstance) {
    super()
    this.SettingsRepo = new SettingsRepository(db)
    this.actions = {
      ['is-logged']: {
        dispatch: this.SettingsRepo.isLogged
      }
    }
  }

  public _dispatcher = (action: ClientAction<SettingsActions>): Promise<void> => {
    const type = action.type as string

    if (action.payload) {
      return this.actions[type].dispatch(action.payload)
    }

    return this.actions[type].dispatch()
  }

  public initialize(): void {
    this.handleAction('services:settings', this._dispatcher)
  }

  public cleanup(): void {
    console.log('close SettingsService')
  }
}
