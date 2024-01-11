import { Heading, Theme } from '@radix-ui/themes'
import { ThemeProvider } from './theme/ThemeProvider'
import { Layout } from './components/'

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Theme>
        <Layout>
          <Heading>Page</Heading>
        </Layout>
      </Theme>
    </ThemeProvider>
  )
}

export default App
