import { useContext } from 'react'
import { AuthContext, type AuthContextType } from '@renderer/context/auth'

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext)
  return context
}
