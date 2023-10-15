import { useAuthContext } from '@renderer/hooks/useAuthContext'
import { FC, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: ReactNode
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const {
    state: { isRegistered }
  } = useAuthContext()

  if (!isRegistered) {
    return <Navigate to="signup" />
  }

  return children
}
