import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'

export const router = createBrowserRouter([{ path: '/', element: <App /> }])

export const MainRouterProvider = () => {
  return <RouterProvider router={router} />
}
