import { HotKey } from '$globalTypes/globals'
import { useHotKeyLoader } from '@renderer/hotkeys'
import { FC, ReactNode, createContext } from 'react'

interface ContextProps {
  settings: {
    hotkeys: {
      keys: HotKey[]
      isLoading: boolean
    }
  }
}

export const context = createContext({} as ContextProps)

interface ProviderProps {
  children: ReactNode
}

export const SettingsProvider: FC<ProviderProps> = ({ children }) => {
  const { hotkeys, isLoading } = useHotKeyLoader()

  return (
    <context.Provider
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
    </context.Provider>
  )
}
