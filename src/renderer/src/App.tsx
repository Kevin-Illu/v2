import { Theme } from '@radix-ui/themes'
import { SettingsPage } from './pages'
import { SettingsProvider } from './context'

function App(): JSX.Element {
  return (
    <Theme
      appearance="dark"
      accentColor="mint"
      grayColor="olive"
      radius="medium"
      panelBackground="translucent"
      scaling="110%"
    >
      <SettingsProvider>
        <SettingsPage />
      </SettingsProvider>
    </Theme>
  )
}

export default App
