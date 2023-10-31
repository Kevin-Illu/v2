import { SignInPage, SignUpPage, TodoPage } from '@renderer/pages'
import { Route } from './types'

export const routes: Route[] = [
  {
    path: '/',
    link: 'todos',
    authType: 'private',
    component: TodoPage
  },
  {
    path: '/signup',
    link: 'signup',
    authType: 'public',
    component: SignUpPage
  },
  {
    path: '/signin',
    link: 'signin',
    authType: 'public',
    component: SignInPage
  }
]
