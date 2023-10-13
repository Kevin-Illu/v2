import { AuthContext, IAuthContext } from '@renderer/context/auth'
import { useContext } from 'react'

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)
  return context
}
