import { AuthAction, AuthState } from './types'

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_IS_REGISTERED':
      return { ...state, isRegistered: action.payload }

    case 'SET_USER_INFORMATION':
      return { ...state, user: action.payload }

    default:
      return state
  }
}
