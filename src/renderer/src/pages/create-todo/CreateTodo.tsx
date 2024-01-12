import { Box, TextField, Section, Text, Button, IconButton, Badge } from '@radix-ui/themes'
import { DotsVerticalIcon, ChevronLeftIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { State } from '$globalTypes/databaseResponse'
import * as React from 'react'

function getTodoStates(): Promise<State[]> {
  return window.api.todos.dataAccessor({ type: 'get-states' })
}

export function CreateTodo() {
  const navigate = useNavigate()
  const [states, setStates] = React.useState<State[]>([])

  const handleGoBackBtnClick = () => {
    navigate('/')
  }

  React.useEffect(() => {
    getTodoStates().then((states) => {
      setStates(states)
    })
  }, [])

  return (
    <Box className="flex flex-col">
      <div className="flex items-center justify-between gap-4 py-2">
        <IconButton onClick={handleGoBackBtnClick} variant="ghost">
          <ChevronLeftIcon />
        </IconButton>
        <div className="flex-1 flex justify-center items-center">
          <Text className="font-bold">Create Todo</Text>
        </div>
        <div>
          <IconButton variant="ghost">
            <DotsVerticalIcon />
          </IconButton>
        </div>
      </div>

      <Section>
        <div>
          <TextField.Input className="flex-1" size="3" placeholder="write your great idea!" />
        </div>
        <div className="flex gap-2 py-2">
          {states.map(({ id, name }) => (
            <Badge key={id}>{name}</Badge>
          ))}
        </div>
        <div className="flex justify-end py-2">
          <Button>create</Button>
        </div>
      </Section>
    </Box>
  )
}
