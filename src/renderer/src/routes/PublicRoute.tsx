import { useAuthContext } from '@renderer/hooks/useAuthContext'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: React.ReactNode
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const {
    state: { isRegistered }
  } = useAuthContext()

  if (isRegistered) {
    return <Navigate to="/" />
  }

  return children
}
