import { useEffect, useReducer } from 'react'

import { AuthContext } from './context'
import { authReducer } from './reducer'

import type { User } from '$globalTypes/models'
import type { AuthState } from './types'

const initialAuthState: AuthState = {
  isRegistered: false,
  user: null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const AuthService = window.api.auth
  const [state, dispatch] = useReducer(authReducer, initialAuthState)

  const getMainUserInformation = async (): Promise<User | null> => {
    return await AuthService.dataAccessor<User | null>({ type: 'get-user' })
  }

  const registerNewUser = async (user: User) => {
    let userTemp: User | null = user

    const isRegisteredSuccessfully = await AuthService.dataAccessor<boolean>({
      type: 'register-user',
      payload: user
    })

    if (!isRegisteredSuccessfully) {
      userTemp = null
    }

    setUserInformation(userTemp)
    return isRegisteredSuccessfully
  }

  const setUserInformation = (userInformation: User | null) => {
    dispatch({ type: 'SET_USER_INFORMATION', payload: userInformation })
    dispatch({ type: 'SET_IS_REGISTERED', payload: !!userInformation })
  }

  useEffect(() => {
    getMainUserInformation().then((userInformation) => {
      setUserInformation(userInformation)
    })

    console.log(state.user, state.isRegistered)
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
