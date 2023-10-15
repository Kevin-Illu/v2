export interface Route {
  path: string
  link: string
  authType: 'public' | 'private'
  component: React.FC
}
