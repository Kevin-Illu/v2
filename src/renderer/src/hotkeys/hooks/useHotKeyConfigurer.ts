import { HotKey } from '$globalTypes/globals'
import { useEffect } from 'react'
import { useHotKeyLoader } from './useHotKeyLoader'

type HotKeyConfigurerReturn = {
  isLoading: boolean
  hotkeys: HotKey[]
}

export const useHotKeyConfigurer = (): HotKeyConfigurerReturn => {
  const { hotkeys, isLoading } = useHotKeyLoader()

  useEffect(() => {
    console.log(hotkeys)
  }, [isLoading])

  return {
    isLoading,
    hotkeys
  }
}
