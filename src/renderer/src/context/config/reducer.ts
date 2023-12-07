import { ConfigAction, ConfigState } from './types'

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState {
  switch (action.type) {
    case 'SET_USER_ID':
      return { ...state, user_id: action.payload }
    default:
      return state
  }
}
