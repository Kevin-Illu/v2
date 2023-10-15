import { HomePage, SignInPage, SignUpPage } from '@renderer/pages'
import { Route } from './types'

export const routes: Route[] = [
  {
    path: '/',
    link: 'home',
    authType: 'private',
    component: HomePage
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
