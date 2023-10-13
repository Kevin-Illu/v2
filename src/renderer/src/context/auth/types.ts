export type TodoActionTypes = 'SET_IS_REGISTERED'

export interface AuthState {
  isRegistered: boolean
}

export type AuthAction = { type: TodoActionTypes; payload: boolean }
