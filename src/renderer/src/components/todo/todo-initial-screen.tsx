import { CheckIcon } from '@radix-ui/react-icons'
import { Box, Button, DialogTrigger, Flex, Heading } from '@radix-ui/themes'

export const InitialScreen = () => {
  return (
    <Box className="h-full w-full">
      <Flex justify="center" align="center" className="mt-16" direction="column" gap="4">
        <Heading size="6">Nothing todo? lets create a new Todo</Heading>
        <DialogTrigger>
          <Button>
            create a new todo
            <CheckIcon />
          </Button>
        </DialogTrigger>
      </Flex>
    </Box>
  )
}
