import { ActionMap, ICommunicationService } from '@main/types'
import CommunicationService from '../communication-service'
import { ClientAction, SettignsActions } from '$globalTypes/index'
import { DatabaseService } from '../database/database-service'

export class SettingsService extends CommunicationService implements ICommunicationService {
  public name: string
  public _actions: ActionMap<SettignsActions>
  public dbService: DatabaseService

  constructor(dbService: DatabaseService, name: string) {
    super()
    this.dbService = dbService
    this.name = name
    this._actions = {}
  }

  public _dispatcher = <SettingsActions>(action: ClientAction<SettingsActions>): Promise<void> => {
    const type = action.type as string

    if (action.payload) {
      return this._actions[type].dispatch(action.payload)
    }

    return this._actions[type].dispatch()
  }

  initialize = (): void => {
    console.log('initializing SettingsService')
    this.handleAction('services:settings', this._dispatcher)
  }

  cleanup = (): void => {
    console.log('close SettingsService')
  }
}
