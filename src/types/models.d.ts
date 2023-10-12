export interface State {
  id: number
  state_name: string
  description: string
  color_name: string
  hex_value: string
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
  created_time: string
  created_date: string
}
