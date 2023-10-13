import { RegisterPage, TodoPage } from '@renderer/pages'

type typeOfRoute = 'protected' | 'public' | 'private'

interface Route {
  to: string
  path: string
  nameLink: string
  component: () => JSX.Element | JSX.Element
  typeOfRoute: typeOfRoute
}

export const routes: Route[] = [
  {
    to: '/register',
    path: '/register',
    nameLink: 'register',
    component: RegisterPage,
    typeOfRoute: 'public'
  },
  {
    to: '/todos',
    path: '/todos',
    nameLink: 'todos',
    component: TodoPage,
    typeOfRoute: 'protected'
  }
]
