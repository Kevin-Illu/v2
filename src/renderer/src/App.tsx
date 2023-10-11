import { Theme } from '@radix-ui/themes'
import { SettingsProvider } from './context'
import { TodoPage } from './pages'

function App(): JSX.Element {
  return (
    <Theme accentColor="lime" grayColor="olive" radius="full" scaling="110%">
      <SettingsProvider>
        <TodoPage />
      </SettingsProvider>
    </Theme>
  )
}

export default App
