import * as React from 'react'
import type { ConfigProps, ConfigStore } from '@renderer/types/stores/configStore'
import createConfigStore from '@renderer/stores/config.store'
import { getStorageTheme, setDefaultTheme } from '@renderer/services/theme'

export const ConfigContext = React.createContext<ConfigStore | null>(null)

interface ConfigProviderProps extends ConfigProps {
  children: React.ReactNode
}

export default function ConfigProvider({ children, ...props }: ConfigProviderProps) {
  const storeRef = React.useRef<ConfigStore>()

  if (!storeRef.current) {
    storeRef.current = createConfigStore(props)
  }

  const [theme] = React.useState(() => getStorageTheme())

  React.useEffect(() => {
    setDefaultTheme(theme)
  }, [theme])

  return <ConfigContext.Provider value={storeRef.current}>{children}</ConfigContext.Provider>
}
