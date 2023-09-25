interface State {
  id: number
  name: string
  description: string
}

interface Task {
  id: number
  name: string
  description: string
  state_id: number
}
