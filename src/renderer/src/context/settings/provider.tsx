import { ReactNode } from 'react'
import { SettingsContext } from './context'
import { useHotKeyLoader } from '@renderer/hotkeys'

interface ProviderProps {
  children: ReactNode
}

export const SettingsProvider: React.FC<ProviderProps> = ({ children }) => {
  const { hotkeys, isLoading } = useHotKeyLoader()

  return (
    <SettingsContext.Provider
      value={{
        settings: {
          hotkeys: {
            isLoading: isLoading,
            keys: hotkeys
          }
        }
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
