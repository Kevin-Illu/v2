import { PlusIcon } from '@radix-ui/react-icons'
import { Box, DialogTrigger, IconButton } from '@radix-ui/themes'

export const AddTodoButton = () => {
  return (
    <Box className="w-full flex flex-row-reverse">
      <DialogTrigger>
        <IconButton type="button" radius="full" size="3">
          <PlusIcon />
        </IconButton>
      </DialogTrigger>
    </Box>
  )
}
