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

export interface HotKey {
  id: number
  key: string
  action: string
}
