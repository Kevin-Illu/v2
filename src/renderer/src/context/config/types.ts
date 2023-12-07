export interface ConfigState {
  user_id: number | null
}

interface SetUserIdAction {
  type: 'SET_USER_ID'
  payload: number
}

export type ConfigAction = SetUserIdAction
