import { Theme } from '@radix-ui/themes'
import { SettingsProvider } from './context'
import { TodoPage } from './pages'

function App(): JSX.Element {
  return (
    <Theme
      appearance="light"
      accentColor="blue"
      grayColor="sand"
      radius="medium"
      panelBackground="solid"
      scaling="110%"
    >
      <SettingsProvider>
        <TodoPage />
      </SettingsProvider>
    </Theme>
  )
}

export default App
