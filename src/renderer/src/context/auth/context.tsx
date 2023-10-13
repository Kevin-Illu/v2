import { createContext, useState } from 'react'

interface AuthContextType {
  user: any
  register: (user: any, callback: VoidFunction) => void
  // signin: (user: string, callback: VoidFunction) => void
  // signout: (callback: VoidFunction) => void
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)

  const register = (newUser: any, callback: VoidFunction) => {
    setUser(newUser)
    callback()
  }
  // let signin = (newUser: string, callback: VoidFunction) => {
  //   return fakeAuthProvider.signin(() => {
  //     setUser(newUser)
  //     callback()
  //   })
  // }

  // let signout = (callback: VoidFunction) => {
  //   return fakeAuthProvider.signout(() => {
  //     setUser(null)
  //     callback()
  //   })
  // }

  // let value = { user, signin, signout }
  const value = { user, register }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
