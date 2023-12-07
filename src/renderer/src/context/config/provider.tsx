import { useEffect, useReducer } from 'react'
import { configReducer } from './reducer'
import { ConfigState } from './types'
import { ConfigContext } from './context'

const initialState: ConfigState = {
  user_id: null
}

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, dispatch] = useReducer(configReducer, initialState)

  return (
    <ConfigContext.Provider
      value={{
        config
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}
