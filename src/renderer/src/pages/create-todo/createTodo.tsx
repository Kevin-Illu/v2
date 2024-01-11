import { Box, Heading, Link as RadixLink } from '@radix-ui/themes'
import { Link } from 'react-router-dom'

export function CreateTodo() {
  return (
    <Box>
      <RadixLink asChild>
        <Link to="/">go back</Link>
      </RadixLink>
      <Heading>Create new Todo</Heading>
    </Box>
  )
}
