import { createContext } from 'react'
import { User } from '$globalTypes/databaseResponse'
import { AuthState } from './types'

export interface AuthContextType {
  state: AuthState
  registerNewUser(user: Partial<User>): Promise<boolean>
}

export const AuthContext = createContext({} as AuthContextType)
