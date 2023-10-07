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

interface TodoCreateFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const TodoCreateForm: FC<TodoCreateFormProps> = ({ setOpen }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    setOpen(false)
  }

  return (
    <DialogContent className="max-w-sm">
      <DialogTitle>Create a new Todo</DialogTitle>
      <DialogDescription mb="4">
        <Text>get started creating something fabolus!</Text>
      </DialogDescription>

      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <label>
            <Text mb="4">Title</Text>
            <TextField.Input placeholder="something special" />
          </label>
          <label>
            <Text mb="4">Description</Text>
            <TextArea placeholder="explain yours goals ..." />
          </label>
          <label>
            <Text mb="4">which state do you use?</Text>
            <StateSelectionGroup states={todoStates} />
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
    </DialogContent>
  )
}

const StateSelectionGroup: FC<{
  states: State[]
}> = ({ states }) => {
  return (
    <RadioGroupRoot>
      <Flex direction="row" gap="4">
        {states.map((state) => (
          <Flex key={state.id} direction="row" gap="3" align="center">
            <RadioGroupItem value={state.id.toString()} />
            <Text>{state.state_name}</Text>
          </Flex>
        ))}
      </Flex>
    </RadioGroupRoot>
  )
}
