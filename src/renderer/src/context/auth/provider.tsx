import { useEffect, useReducer } from 'react'

import { AuthContext } from './context'
import { authReducer } from './reducer'

import type { User } from '$globalTypes/models'
import type { AuthState } from './types'
import { getUserInformation, verifyUserRegistration } from './AuthService'

const initialAuthState: AuthState = {
  isRegistered: false,
  user: null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  const registerNewUser = async (user: User) => {
    const isRegisteredSuccessfully = await verifyUserRegistration(user)
    setUserInformation(isRegisteredSuccessfully ? user : null)

    return isRegisteredSuccessfully
  }

  const setUserInformation = (userInfo: User | null) => {
    dispatch({ type: 'SET_USER_INFORMATION', payload: userInfo })
    dispatch({ type: 'SET_IS_REGISTERED', payload: !!userInfo })
  }

  // optienen el usuario cuando se inicia la aplicacion
  // si es el primer launch optiene null y muestra el signup page
  useEffect(() => {
    getUserInformation().then((userInfo) => {
      setUserInformation(userInfo)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        registerNewUser: registerNewUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
