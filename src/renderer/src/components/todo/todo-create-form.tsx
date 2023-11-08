import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, DialogClose, Flex } from '@radix-ui/themes'
import { InputTextField } from '../ui'
import { State, Todo } from '$globalTypes/models'
import { FC } from 'react'

interface CreateTodoFormProps {
  stateList: State[]
  handleSubmit: (todo: Todo) => void
}

export const CreateTodoForm: FC<CreateTodoFormProps> = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        state_id: 1,
        description: ''
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Is required.')
      })}
      onSubmit={(values: Todo) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="4">
            <InputTextField
              label="Title"
              name="name"
              placeholder="Enter your chosen title"
              formik={formik}
            />
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <DialogClose>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">create</Button>
          </Flex>
        </form>
      )}
    </Formik>
  )
}
