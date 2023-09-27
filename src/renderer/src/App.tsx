import { Theme } from '@radix-ui/themes'
import { HomePage } from './pages'

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
      <HomePage />
    </Theme>
  )
}

export default App
