import { Formik } from 'formik'
import * as Yup from 'yup'
import { Button, DialogClose, Flex, Text } from '@radix-ui/themes'
import { AreaTextField, InputTextField } from '../ui'
import { StateSelectionGroup } from './todo-state-selection-group-form'

export const TodoCreateForm = ({ stateList, handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        state_id: '1'
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Is required.')
      })}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="4">
            <InputTextField
              label="Title"
              name="name"
              placeholder="new placeholder"
              formik={formik}
            />
            <AreaTextField
              label="Description"
              name="description"
              placeholder="explain your goals"
              formik={formik}
            />
            <label>
              <Text mb="4">which state do you use?</Text>
              <StateSelectionGroup states={stateList} formik={formik} />
            </label>
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
