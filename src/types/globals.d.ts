export interface State {
  id: number
  name: string
  description: string
}

export interface Task {
  id: number
  name: string
  description: string
  state_id: number
}
