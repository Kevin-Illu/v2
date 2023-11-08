export interface State {
  id: number
  state_name: string
  description: string
}

export interface Todo {
  id?: number
  name: string
  description: string | undefined
  state_id: number
}

export interface User {
  name: string
  email: string
}
