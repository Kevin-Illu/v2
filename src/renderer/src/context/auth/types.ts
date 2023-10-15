import { User } from '$globalTypes/models'

export interface AuthState {
  isRegistered: boolean
  user: User | null
}

export interface SetIsRegisteredAction {
  type: 'SET_IS_REGISTERED'
  payload: boolean
}

export interface SetUserInformationAction {
  type: 'SET_USER_INFORMATION'
  payload: User | null
}

export type AuthAction = SetIsRegisteredAction | SetUserInformationAction
