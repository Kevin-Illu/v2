import { Theme } from '@radix-ui/themes'
import { Home } from './pages/home'
import '@radix-ui/themes/styles.css'

function App(): JSX.Element {
  return (
    <Theme appearance="dark" accentColor="lime" grayColor="olive" radius="small">
      <Home />
    </Theme>
  )
}

export default App
