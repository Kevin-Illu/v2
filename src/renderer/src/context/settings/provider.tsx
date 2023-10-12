import { ReactNode } from 'react'
import { SettingsContext } from './context'

interface ProviderProps {
  children: ReactNode
}

export const SettingsProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <SettingsContext.Provider
      value={{
        settings: {
          hotkeys: {
            isLoading: false,
            keys: null
          }
        }
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
