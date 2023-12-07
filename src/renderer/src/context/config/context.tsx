import { createContext } from 'vm'
import { ConfigState } from './types'

export interface ConfigContextType {
  state: ConfigState
}

export const ConfigContext = createContext({} as ConfigContextType)
