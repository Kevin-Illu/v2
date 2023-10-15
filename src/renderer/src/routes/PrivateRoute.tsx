import { useAuthContext } from '@renderer/hooks/useAuthContext'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const {
    state: { isRegistered }
  } = useAuthContext()

  if (!isRegistered) {
    return <Navigate to="signup" />
  }

  return children
}
