import { FC, useState } from 'react'
import { TodoResponse } from '$globalTypes/databaseResponse'
import { ArchiveIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Box, Dialog, DialogTrigger, Flex, IconButton } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { InputTextField } from '../ui'
import { EditTodoDialog } from './todo-editing-dialog'

interface ItemProps extends TodoResponse {}

export const TodoItem: FC<ItemProps> = (todo) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { todo_id, todo_name } = todo
  const [todoName] = useState(todo_name)
  const {
    setEditingTodo,
    state: { editingTodo }
  } = useTodoContext()
  const handleEditionTodo = () => setEditingTodo(todo)

  const handleOpenDialog = (isOpen: boolean) => {
    // cuando se abre el dialog y se cierra es necesario
    // establecer el todo editado en null
    if (isDialogOpen && !isOpen) {
      setEditingTodo(null)
    }

    setIsDialogOpen(isOpen)
  }

  const handleSubmit = (value: string) => {
    console.log(value)
  }

  return (
    <Dialog.Root onOpenChange={handleOpenDialog} open={isDialogOpen}>
      <Box className="flex justify-between gap-8" key={todo_id}>
        <Formik
          initialValues={{
            todo_name: todoName
          }}
          validationSchema={Yup.object({
            todo_name: Yup.string().required('Ok?')
          })}
          onSubmit={({ todo_name }) => {
            handleSubmit(todo_name)
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="w-full">
              <InputTextField label="" name="todo_name" formik={formik} />
            </form>
          )}
        </Formik>
        <Flex gap="4" justify="between" align="center">
          <DialogTrigger>
            <IconButton variant="ghost" onClick={handleEditionTodo}>
              <Pencil1Icon />
            </IconButton>
          </DialogTrigger>
          <IconButton variant="ghost">
            <ArchiveIcon />
          </IconButton>
        </Flex>
      </Box>

      {editingTodo && <EditTodoDialog />}
    </Dialog.Root>
  )
}
