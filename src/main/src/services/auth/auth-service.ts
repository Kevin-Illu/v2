import { ActionMap, ICommunication, MainDatabaseInstance } from '@main/types'
import CommunicationService from '../communication-service'
import { AuthActions, ClientAction } from '$globalTypes/comunication'
import { AuthRepository } from '../../repositories/auth'

export class AuthService extends CommunicationService implements ICommunication {
  public name = 'AuthService'
  public actions: ActionMap<AuthActions>
  public authRepo: AuthRepository

  constructor(db: MainDatabaseInstance) {
    super()
    this.authRepo = new AuthRepository(db)
    this.actions = {
      ['authenticate']: {
        dispatch: (newUser: any): Promise<boolean> => this.authRepo.authenticate(newUser)
      },
      ['is-authenticated']: {
        dispatch: this.authRepo.isAuthenticated
      }
    }
  }

  public _dispatcher = (action: ClientAction<AuthActions>): Promise<void> => {
    const type = action.type as string

    if (action.payload) {
      return this.actions[type].dispatch(action.payload)
    }

    return this.actions[type].dispatch()
  }

  public initialize = (): void => {
    console.log('initializing auth service')
    this.handleAction('services:auth', this._dispatcher)
  }
  public cleanup = (): void => {
    console.log('close auth service')
  }
}
