import { FC, useEffect, useState } from 'react'
import { TodoResponse } from '$globalTypes/databaseResponse'
import { ArchiveIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, DialogTrigger, Flex, IconButton } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { EditTodoDialog } from './todo-editing-dialog'

interface ItemProps extends TodoResponse {}

// TODO: mostrar el boton de save cuando el usuario edite el texto
export const TodoItem: FC<ItemProps> = (todo) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [wasEdited, setWasEdited] = useState(false)
  const [showSaveButton, setShowSetButton] = useState(false)

  const { todo_id, todo_name } = todo
  const [todoName, setTodoName] = useState(todo_name)
  const { setEditingTodo } = useTodoContext()
  const handleEditingTodo = () => setEditingTodo(todo)

  const handleOpenDialog = (isOpen: boolean) => {
    // cuando se abre el dialog y se cierra es necesario
    // establecer el todo editado en null
    if (isDialogOpen && !isOpen) {
      setEditingTodo(null)
    }

    setIsDialogOpen(isOpen)
  }

  const handleSubmit = (value: string) => {
    setTodoName(value)
  }

  useEffect(() => {
    setShowSetButton(wasEdited)
  }, [wasEdited])

  return (
    <Dialog.Root onOpenChange={handleOpenDialog} open={isDialogOpen}>
      <Box
        className="flex justify-between items-center gap-8 border-solid border-[1px] px-4 py-2 rounded-xl"
        key={todo_id}
      >
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
              <input
                type="text"
                name="todo_name"
                value={formik.values.todo_name}
                className="w-full focus:outline-none"
                onChange={(e) => {
                  setWasEdited(todoName !== e.target.value)
                  formik.handleChange(e)
                }}
                onBlur={formik.handleBlur}
              />
            </form>
          )}
        </Formik>
        <Flex gap="4" justify="between" align="center">
          {showSaveButton ? <Button variant="ghost">save</Button> : null}
          <DialogTrigger>
            <IconButton variant="ghost" onClick={handleEditingTodo}>
              <Pencil1Icon />
            </IconButton>
          </DialogTrigger>
          <IconButton variant="ghost">
            <ArchiveIcon />
          </IconButton>
        </Flex>
      </Box>

      <EditTodoDialog />
    </Dialog.Root>
  )
}
