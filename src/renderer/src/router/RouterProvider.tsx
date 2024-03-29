import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { CreateTodoPage } from './../pages/create-todo/CreateTodo'
import { Layout } from './../components'
import App from './../App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      {
        path: 'create',
        element: <CreateTodoPage />
      }
    ]
  }
])

export const MainRouterProvider = () => {
  return <RouterProvider router={router} />
}
