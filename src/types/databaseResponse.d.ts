/*
 * aqui se definen los tipos con los que los servicios
 * responden al cliente, estoy quiere decir que el render
 * y el main process utilizan estos types
 */

export interface RawTodo {
  todo_id: number
  todo_name: string
  todo_state_id: number
  todo_state_name: string
  step_id: number
  step_name: string
  parent_step_id: number | null
  level: number
  parent_name: string | null
  todo_description: string | null
  step_description: string | null
  todo_archived: number
  step_completed: number
}

export interface Todo {
  todo_id: number
  todo_name: string
  todo_archived: boolean
  state_id: number
  state_name: string
  description: string | null
  steps: Step[]
}

export interface Step {
  id: number
  name: string
  description: string | null
  completed: boolean
  sub_steps: Step[]
}
