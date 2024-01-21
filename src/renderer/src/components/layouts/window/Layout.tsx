import { Box, Container, ScrollArea, Theme } from '@radix-ui/themes'
import { NavBar } from '../../ui'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import ConfigProvider from '@renderer/providers/ConfigProvider'

export const Layout: React.FC = () => {
  return (
    <ConfigProvider theme="system">
      <Theme accentColor="red" grayColor="mauve" radius="medium" scaling="110%">
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
    </ConfigProvider>
  )
}
