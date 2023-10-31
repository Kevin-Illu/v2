import { Box, DialogRoot } from '@radix-ui/themes'
import { AddTodoButton, TodoFormDialog } from './'
import { useTodoContext } from '@renderer/hooks/useTodoContext'
import { FC, ReactNode } from 'react'

interface TodoManagerProps {
  children?: ReactNode
  hiddeButton?: boolean
}

export const TodoManager: FC<TodoManagerProps> = ({ children, hiddeButton }) => {
  const { setIsDialogOpen, state } = useTodoContext()
  const { isDialogOpen } = state

  return (
    <Box>
      <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {children && children}
        <Box className="bg-red-50 absolute bottom-0 left-0 right-0 w-full px-14 xl:px-28 mx-auto mb-4">
          <TodoFormDialog />
          {!hiddeButton ? <AddTodoButton /> : null}
        </Box>
      </DialogRoot>
    </Box>
  )
}
