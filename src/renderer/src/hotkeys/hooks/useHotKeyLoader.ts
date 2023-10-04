import { HotKey } from '$globalTypes/globals'
import { useState, useEffect } from 'react'

type KeyLoaderReturn = {
  isLoading: boolean
  hotkeys: HotKey[]
  loadkeys: () => Promise<void>
  setHotKeys: React.Dispatch<React.SetStateAction<HotKey[]>>
}

export function useHotKeyLoader(): KeyLoaderReturn {
  const [isLoading, setIsLoading] = useState(true)
  const [hotKeys, setHotKeys] = useState<HotKey[]>([])
  const { settings } = window.api

  async function loadHotKeys(): Promise<void> {
    try {
      const keys = await settings.get<HotKey[]>({ name: 'get-hotkeys', payload: null })
      setHotKeys(keys)
      setIsLoading(false)
    } catch (error) {
      console.error('Error al cargar hotkeys:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadHotKeys()
  }, []) // Llamar loadHotKeys al montar el componente

  return {
    isLoading,
    hotkeys: hotKeys,
    setHotKeys,
    loadkeys: loadHotKeys
  }
}
