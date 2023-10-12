import { Theme } from '@radix-ui/themes'
import { TodoPage } from './pages'

function App(): JSX.Element {
  return (
    <Theme accentColor="lime" grayColor="olive" radius="full" scaling="110%">
      <TodoPage />
    </Theme>
  )
}

export default App
