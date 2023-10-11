import { Box, DialogRoot } from '@radix-ui/themes'
import { AddTodoButton, TodoFormDialog } from './'
import { useTodoContext } from '@renderer/hooks/useTodoContext'

export const TodoManager = () => {
  const { setIsDialogOpen, state } = useTodoContext()
  const { isDialogOpen } = state

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-full px-14 xl:px-28 mx-auto mb-4">
      <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <TodoFormDialog />
        <AddTodoButton />
      </DialogRoot>
    </Box>
  )
}
