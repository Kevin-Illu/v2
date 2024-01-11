import { Box, Container, ScrollArea, Theme } from '@radix-ui/themes'
import { NavBar } from '../../ui'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@renderer/theme/ThemeProvider'

export const Layout: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Theme>
        <Box className="w-screen h-screen flex flex-col">
          <NavBar />

          <ScrollArea className="h-full w-full relative">
            <Container className="px-8 lg:px-0">
              <Outlet />
            </Container>
          </ScrollArea>

          <Footer />
        </Box>
      </Theme>
    </ThemeProvider>
  )
}
