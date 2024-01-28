import { Todo } from '$globalTypes/databaseResponse'
import { Dialog, Flex, TextField, TextArea, Text, Button } from '@radix-ui/themes'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'
import { create } from '@renderer/services/todos'
import { Formik } from 'formik'

import * as Yup from 'yup'

export const CreateTaskDialog = ({ children }) => {
  const revalidateTaskList = useConfigContext((s) => s.setListRevalidation)

  const newTodoSchema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    description: Yup.string()
  })

  const handleCreate = (todo: { name: string; description: string }) => {
    const newTodo: Partial<Todo> = {
      ...todo,
      state_id: 1
    }

    create(newTodo).then(() => {
      revalidateTaskList(true)
    })
  }

  return (
    <Dialog.Root>
      <div className="sticky bottom-0">
        <Flex className="py-4" align="center" justify="end">
          <Dialog.Trigger>{children}</Dialog.Trigger>
        </Flex>
      </div>

      <Dialog.Content style={{ maxWidth: 580 }}>
        <Formik
          initialValues={{
            name: '',
            description: ''
          }}
          validationSchema={newTodoSchema}
          onSubmit={handleCreate}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Flex direction="column" gap="3">
                <label>
                  <TextField.Input
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    name="name"
                    placeholder="Task name here"
                  />

                  {formik.errors.name && (
                    <Text size="1" id="feedback" color="red">
                      {formik.errors.name}
                    </Text>
                  )}
                </label>
                <label>
                  <TextArea
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    name="description"
                    placeholder="Description"
                  />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button type="submit">Add Todo</Button>
                </Dialog.Close>
              </Flex>
            </form>
          )}
        </Formik>
      </Dialog.Content>
    </Dialog.Root>
  )
}
