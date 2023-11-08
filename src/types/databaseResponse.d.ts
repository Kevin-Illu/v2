/*
 * aqui se definen los tipos con los que los servicios
 * responden al cliente, estoy quiere decir que el render
 * y el main process utilizan estos types
 */

export interface TodoResponse {
  todo_id: number
  todo_name: string
  todo_description: string
  todo_archived: boolean
  state_name: string
  state_description: string
  created_date: string
}
