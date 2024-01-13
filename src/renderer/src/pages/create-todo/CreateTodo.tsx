import { Box, TextField, Section, Button, Badge } from '@radix-ui/themes'
import { State } from '$globalTypes/databaseResponse'
import * as React from 'react'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'

function getTodoStates(): Promise<State[]> {
  return window.api.todos.dataAccessor({ type: 'get-states' })
}

export function CreateTodo() {
  const [states, setStates] = React.useState<State[]>([])
  const setDinamicTitle = useConfigContext((s) => s.setDinamicTitle)

  React.useEffect(() => {
    setDinamicTitle('create todo')
  }, [])

  React.useEffect(() => {
    getTodoStates().then((states) => {
      setStates(states)
    })
  }, [])

  return (
    <Box className="flex flex-col">
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
