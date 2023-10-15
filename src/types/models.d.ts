export interface State {
  id: number
  state_name: string
  description: string
}

export interface Todo {
  id: number
  name: string
  description: string
  state_id: number
}

export interface TodoResponse {
  todo_id: number
  todo_name: string
  todo_description: string
  todo_archived: boolean
  state_name: string
  state_description: string
  created_date: string
}

export interface User {
  name: string
  email: string
}
