import { AuthActions, ClientAction } from '$globalTypes/comunication'
import { ActionMap, ICommunication, MainDatabaseInstance } from '@main/types'

import CommunicationService from '../communication'
import { AuthRepository } from '../../repositories/auth'

export class AuthService extends CommunicationService implements ICommunication {
  public name = 'AuthService'
  public actions: ActionMap<AuthActions>
  public authRepo: AuthRepository

  constructor(db: MainDatabaseInstance) {
    super()
    this.authRepo = new AuthRepository(db)
    this.actions = {
      ['register-user']: {
        dispatch: (newUser): Promise<boolean> => this.authRepo.register(newUser)
      },
      ['get-user']: {
        dispatch: this.authRepo.getUser
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
    // console.log('initializing auth service')
    this.handleAction('services:auth', this._dispatcher)
  }

  public cleanup = (): void => {
    // console.log('close auth service')
  }
}
