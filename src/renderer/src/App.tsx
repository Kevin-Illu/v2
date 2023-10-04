import { Theme } from '@radix-ui/themes'
import { SettingsProvider } from './context'
import { TodoPage } from './pages'

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
        <TodoPage />
      </SettingsProvider>
    </Theme>
  )
}

export default App
