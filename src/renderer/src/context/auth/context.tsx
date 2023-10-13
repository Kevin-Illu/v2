import { createContext, useReducer } from 'react'
import { authReducer } from './reducer'
import { AuthAction, AuthState } from './types'

const initialAuthState: AuthState = {
  isRegistered: false
}

export interface IAuthContext {
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}
