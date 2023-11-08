import { DialogContent, DialogTitle } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks'

export const EditTodoDialog = () => {
  const {
    state: { editingTodo }
  } = useTodoContext()
  const { todo_name } = editingTodo!

  return (
    <DialogContent>
      <DialogTitle>{todo_name}</DialogTitle>
    </DialogContent>
  )
}
