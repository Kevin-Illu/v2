import { useEffect } from 'react'
import useConfigContext from './consumers/useConfigContext'

interface PageSettings {
  title?: string
}

export function usePageSettings({ title }: PageSettings) {
  const setTitle = useConfigContext((s) => s.setDinamicTitle)

  useEffect(() => {
    if (title) {
      setTitle(title)
    }
  }, [])
}
