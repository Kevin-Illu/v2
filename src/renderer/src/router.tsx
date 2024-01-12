import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CreateTodo } from './pages/create-todo/CreateTodo'
import { Layout } from './components'
import App from './App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        path: 'create',
        element: <CreateTodo />
      }
    ]
  }
])

export const MainRouterProvider = () => {
  return <RouterProvider router={router} />
}
