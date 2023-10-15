import { Theme } from '@radix-ui/themes'
import { HomePage } from './pages'
import { AuthProvider } from './context/auth'

function App(): JSX.Element {
  return (
    <Theme accentColor="lime" grayColor="olive" radius="full" scaling="110%">
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </Theme>
  )
}

export default App
