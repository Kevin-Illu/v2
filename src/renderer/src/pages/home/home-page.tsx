import { Box, Container, Flex, ScrollArea } from '@radix-ui/themes'
import { GitHubLogoIcon, FramerLogoIcon, VercelLogoIcon } from '@radix-ui/react-icons'
import { NavBar, AddTodo } from '@renderer/components'

// TODO: convert this component to a layout component
const HomePage = () => {
  return (
    <Box className="w-screen h-screen flex flex-col bg-white dark:bg-black">
      <NavBar />

      <ScrollArea className="h-full w-full relative">
        <Container>
          <Box className="h-full px-4 w-full"></Box>
          <AddTodo />
        </Container>
      </ScrollArea>

      <footer className="w-full h-10 bg-white border-solid border-t-[1px] px-4">
        <Flex align="center" justify="end" gap="2" className="w-full h-full">
          <GitHubLogoIcon />
          <VercelLogoIcon />
          <FramerLogoIcon />
        </Flex>
      </footer>
    </Box>
  )
}

export default HomePage
