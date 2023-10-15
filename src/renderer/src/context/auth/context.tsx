import { createContext } from 'react'
import { User } from '$globalTypes/models'
import { AuthState } from './types'

export interface AuthContextType {
  state: AuthState
  registerNewUser(user: User): Promise<boolean>
}

export const AuthContext = createContext({} as AuthContextType)
