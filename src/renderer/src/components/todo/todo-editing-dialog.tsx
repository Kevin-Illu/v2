import * as Yup from 'yup'
import { DialogContent, Flex, IconButton } from '@radix-ui/themes'
import { useTodoContext } from '@renderer/hooks'
import { Formik } from 'formik'
import { InputTextField } from '../ui'
import { ArrowDownIcon } from '@radix-ui/react-icons'

export const EditTodoDialog = () => {
  const {
    state: { editingTodo }
  } = useTodoContext()

  if (!editingTodo) {
    return null
  }

  const { todo_name } = editingTodo

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <DialogContent>
      <Formik
        initialValues={{
          todo_name: todo_name
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
            <Flex gap="2" justify="between" align="center">
              <InputTextField label="" name="todo_name" formik={formik} className="flex-1" />
              <Flex>
                <IconButton>
                  <ArrowDownIcon />
                </IconButton>
              </Flex>
            </Flex>
          </form>
        )}
      </Formik>
    </DialogContent>
  )
}
