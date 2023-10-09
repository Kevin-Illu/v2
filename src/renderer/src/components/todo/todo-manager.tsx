import { Box, DialogRoot } from '@radix-ui/themes'
import { AddTodoButton, TodoFormDialog } from './'
import { FC, useState } from 'react'

export const TodoManager: FC<{
  setIsTodoCreated: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setIsTodoCreated }) => {
  const [open, setOpen] = useState(false)

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-4">
      <DialogRoot open={open} onOpenChange={setOpen}>
        <TodoFormDialog setOpen={setOpen} setIsTodoCreated={setIsTodoCreated} />
        <AddTodoButton />
      </DialogRoot>
    </Box>
  )
}
