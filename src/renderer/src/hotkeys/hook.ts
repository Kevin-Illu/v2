import { useEffect, useCallback } from 'react'

type OptionalConfig = {
  altKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
}

interface ShortcutConfig extends OptionalConfig {
  code: string
  shortcutTarget?: HTMLElement
}

type ShortcutAction = (e: KeyboardEvent) => void

export function useKeyboardShortcut(shortcutAction: ShortcutAction, config: ShortcutConfig): void {
  const targetElement = config.shortcutTarget || document

  const eventHandler = useCallback(
    (e: KeyboardEvent) => {
      const { code, ctrlKey, altKey, shiftKey } = e
      if (config.code !== code) return
      if (config.ctrlKey && !ctrlKey) return
      if (config.shiftKey && !shiftKey) return
      if (config.altKey && !altKey) return

      shortcutAction(e)
    },
    [shortcutAction, config]
  )

  useEffect(() => {
    targetElement.addEventListener('keydown', eventHandler)
    return () => targetElement.removeEventListener('keydown', eventHandler)
  }, [targetElement, eventHandler])
}
