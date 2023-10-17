import { Box, Container } from '@radix-ui/themes'
import { CreateAcount } from '@renderer/components'

export const SignUpPage = () => {
  return (
    <Box className="w-screen h-screen">
      <Container className="px-8 xl:px-0 h-full flex justify-center items-center">
        <CreateAcount />
      </Container>
    </Box>
  )
}
