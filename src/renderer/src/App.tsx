import { Theme } from '@radix-ui/themes'
import { AuthProvider } from './context/auth'
import { AppRouter } from './routes/AppRouter'

function App(): JSX.Element {
  return (
    <Theme accentColor="lime" grayColor="olive" radius="full" scaling="110%">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Theme>
  )
}

export default App
