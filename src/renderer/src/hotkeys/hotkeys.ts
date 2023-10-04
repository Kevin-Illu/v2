interface HotKeysMap {
  [key: string]: {
    name: string
    action(): void
  }
}

export const hotKeys: HotKeysMap = {
  'Ctrl-Period': {
    name: 'Open settings',
    action: () => console.log('opening settings...')
  }
}
