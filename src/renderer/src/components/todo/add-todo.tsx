import { Box, Card, TextField, IconButton } from '@radix-ui/themes'
import { PlusIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { State } from '$globalTypes/globals'
import { StatesList } from './states'

export const AddTodo = () => {
  const [todoStates, setTodoStates] = useState<State[]>([])

  useEffect(() => {
    getStates()
  }, [])

  async function getStates() {
    const response = await window.api.todos.get<State[]>({ name: 'get-states', payload: null })
    setTodoStates(response)
  }

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-6">
      <Card className="bg-transparent px-4 py-2" variant="classic">
        <Box className="pb-4">
          <StatesList states={todoStates} />
        </Box>
        <TextField.Root>
          <TextField.Input variant="surface" size="3" placeholder="write something special" />
          <TextField.Slot pr="3">
            <IconButton size="2" variant="ghost">
              <PlusIcon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </Card>
    </Box>
  )
}
