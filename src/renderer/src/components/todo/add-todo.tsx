import { Box, Card, TextField, IconButton } from '@radix-ui/themes'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

// TODO: add the functionality to create new todos
// and save it into the database
export const AddTodo = () => {
  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-6">
      <Card className="bg-transparent px-4 py-2" variant="classic">
        <TextField.Root>
          <TextField.Input variant="soft" size="3" placeholder="write something special" />
          <TextField.Slot pr="3">
            <IconButton size="2" variant="ghost">
              <PaperPlaneIcon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Card>
    </Box>
  )
}
