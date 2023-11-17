import { FC, useEffect, useState } from 'react'
import { Todo as TodoResponse } from '$globalTypes/databaseResponse'
import { ArchiveIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, DialogTrigger, Flex, IconButton } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { EditTodoDialog } from './todo-editing-dialog'
import { updateTodo } from '@renderer/context/todo/todo-service'
import { Todo } from '$globalTypes/models'

interface ItemProps extends TodoResponse {}

export const TodoItem: FC<ItemProps> = (todo) => {
  const { todo_id, todo_name } = todo
  const { setEditingTodo } = useTodoContext()

  // es necesario agregar el todo actual al contexto cuando
  // se quiere editar en el dialog de edicion
  const handleEditingTodo = () => setEditingTodo(todo)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [wasEdited, setWasEdited] = useState(false)
  const [showSaveButton, setShowSaveButton] = useState(false)

  const handleOpenDialog = (isOpen: boolean) => {
    // cuando el dialog esta abierto y se cierra, es necesario
    // establecer el todo editado en null
    if (isDialogOpen && !isOpen) {
      setEditingTodo(null)
    }

    setIsDialogOpen(isOpen)
  }

  const handleSubmit = (newName: string) => {
    updateTodo({
      id: todo.todo_id,
      name: newName
    } as Todo)

    setWasEdited(false)
  }

  useEffect(() => {
    setShowSaveButton(wasEdited)
  }, [wasEdited])

  return (
    <Dialog.Root onOpenChange={handleOpenDialog} open={isDialogOpen}>
      <Box
        className="flex justify-between items-center gap-8 border-solid border-[1px] px-4 py-2 rounded-xl"
        key={todo_id}
      >
        <Formik
          initialValues={{
            todo_name
          }}
          validationSchema={Yup.object({
            todo_name: Yup.string().required('Ok?')
          })}
          onSubmit={({ todo_name }) => {
            handleSubmit(todo_name)
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="w-full flex justify-between items-center"
            >
              <input
                type="text"
                name="todo_name"
                value={formik.values.todo_name}
                className="w-full focus:outline-none"
                onChange={(e) => {
                  formik.handleChange(e)
                  setWasEdited(todo_name !== e.target.value)
                }}
                onBlur={(e) => {
                  if (e.target.value === '') {
                    formik.values.todo_name = todo_name
                    setWasEdited(false)
                  }
                  formik.handleBlur(e)
                }}
              />

              <Flex gap="4" justify="between" align="center">
                {showSaveButton && (
                  <Button variant="ghost" type="submit">
                    saveeee
                  </Button>
                )}
                <DialogTrigger>
                  <IconButton variant="ghost" onClick={handleEditingTodo}>
                    <Pencil1Icon />
                  </IconButton>
                </DialogTrigger>
                <IconButton variant="ghost">
                  <ArchiveIcon />
                </IconButton>
              </Flex>
            </form>
          )}
        </Formik>
      </Box>

      <EditTodoDialog />
    </Dialog.Root>
  )
}
