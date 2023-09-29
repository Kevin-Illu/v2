import { Box, Container, ScrollArea } from '@radix-ui/themes'
import { NavBar } from '../ui'
import { Footer } from './footer'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className="w-screen h-screen flex flex-col" color="lima">
      <NavBar />

      <ScrollArea className="h-full w-full relative" color="lima">
        <Container className="px-8 lg:px-0">{children}</Container>
      </ScrollArea>

      <Footer />
    </Box>
  )
}
