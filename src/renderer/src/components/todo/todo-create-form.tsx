import { useEffect, useState, FC } from 'react'
import {
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Flex,
  RadioGroupItem,
  RadioGroupRoot,
  Text,
  TextArea,
  TextField
} from '@radix-ui/themes'
import { type State } from '$globalTypes/globals'
import { Formik } from 'formik'
import { FormikProps } from 'formik/dist/types'

interface TodoFormDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoFormDialog: FC<TodoFormDialogProps> = ({ setOpen }) => {
  const [todoStates, setTodoStates] = useState<State[]>([])
  const fetchStates = window.api.todos

  useEffect(() => {
    fetchStates.get<State[]>({ name: 'get-states', payload: null }).then((states) => {
      const CANCELED = 4
      const COMPLETED = 6
      const filteredStates = states.filter((s) => s.id !== CANCELED && s.id !== COMPLETED)

      setTodoStates(filteredStates)
    })
  }, [])

  const handleSubmit = (values) => {
    console.log(values)
    setOpen(false)
  }

  return (
    <DialogContent className="max-w-sm">
      <DialogTitle>Create a new Todo</DialogTitle>
      <DialogDescription mb="4">
        <Text>get started creating something fabolus!</Text>
      </DialogDescription>

      <TodoCreateForm stateList={todoStates} handleSubmit={handleSubmit} />
    </DialogContent>
  )
}

const TodoCreateForm = ({ stateList, handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        stateId: '1'
      }}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap="4">
            <label>
              <Text>Title</Text>
              <TextField.Input {...formik.getFieldProps('title')} placeholder="your goal" />
            </label>
            <label>
              <Text mb="4">Description</Text>
              <TextArea
                placeholder="explain yours goals ..."
                {...formik.getFieldProps('description')}
              />
            </label>
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

const StateSelectionGroup: FC<{
  states: State[]
  formik: FormikProps<{
    title: string
    description: string
    stateId: string
  }>
}> = ({ states, formik }) => {
  return (
    <RadioGroupRoot value={formik.values.stateId} name="stateId" onChange={formik.handleChange}>
      <Flex direction="row" gap="4">
        {states.map((state) => (
          <StateSelectionItem key={state.id} state={state} />
        ))}
      </Flex>
    </RadioGroupRoot>
  )
}

const StateSelectionItem: FC<{ state: State }> = ({ state }) => {
  return (
    <label key={state.id} className="flex items-center gap-3">
      <RadioGroupItem value={state.id.toString()} />
      <Text>{state.state_name}</Text>
    </label>
  )
}
