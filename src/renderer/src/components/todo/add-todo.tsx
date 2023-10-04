import { State } from '$globalTypes/globals'
import { PlusIcon } from '@radix-ui/react-icons'
import { Box, IconButton, Kbd, Text, Tooltip } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

async function getStates() {
  const states = await window.api.todos.get<State[]>({ name: 'get-states', payload: null })
  return states
}

export const AddTodo = () => {
  const [statelist, setStatelist] = useState<State[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getStates().then(setStatelist).catch(setError)
  }, [])

  if (error) {
    return <p>{error}</p>
  }

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-6">
      {Object.values(statelist).map((s) => (
        <Text key={s.id}>{s.state_name}</Text>
      ))}

      <Box className="w-full flex flex-row-reverse">
        <Tooltip content={<ToolTipContent />}>
          <IconButton type="button" radius="full" size="3" color="blue">
            <PlusIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

const ToolTipContent = () => (
  <Text>
    add new todo <Kbd>Ctr + a</Kbd>
  </Text>
)
