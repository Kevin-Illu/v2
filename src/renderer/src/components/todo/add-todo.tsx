import { Box, Card, TextField, IconButton, Text } from '@radix-ui/themes'
import { RocketIcon } from '@radix-ui/react-icons'
import { useEffect, useRef, useState } from 'react'
import { State } from '$globalTypes/globals'
import { StatesList } from './states'

export const AddTodo = () => {
  const [todoStates, setTodoStates] = useState<State[]>([])
  const todoNameInput = useRef<HTMLInputElement>(null)
  const [newTodo, setNewTodo] = useState({
    name: '',
    state_id: ''
  })

  useEffect(() => {
    getStates()
  }, [])

  async function getStates() {
    const response = await window.api.todos.get<State[]>({ name: 'get-states', payload: null })
    setTodoStates(response)
  }

  function handleInputChange() {
    const name = todoNameInput.current!.value
    setNewTodo((prev) => ({
      ...prev,
      name
    }))
  }

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-6">
      <Card className="px-4 py-2" variant="classic">
        <Text>{newTodo.name}</Text>
        <Box className="pb-4">
          <StatesList states={todoStates} />
        </Box>
        <TextField.Root>
          <TextField.Input
            ref={todoNameInput}
            onChange={handleInputChange}
            variant="surface"
            size="3"
            placeholder="write something special"
          />
          <TextField.Slot>
            <IconButton size="1" variant="solid">
              <RocketIcon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Card>
    </Box>
  )
}
