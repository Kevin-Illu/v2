import { Box, DialogRoot } from '@radix-ui/themes'
import { AddTodoButton, TodoCreateForm } from './'
import { useState } from 'react'

export const TodoManager = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-4">
      <DialogRoot open={open} onOpenChange={setOpen}>
        <TodoCreateForm setOpen={setOpen} />
        <AddTodoButton />
      </DialogRoot>
    </Box>
  )
}
