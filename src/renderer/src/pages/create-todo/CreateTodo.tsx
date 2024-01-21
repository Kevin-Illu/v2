import {
  Box,
  TextField,
  Section,
  RadioGroup,
  Flex,
  Text,
  IconButton,
  Tooltip
} from '@radix-ui/themes'
import { State } from '$globalTypes/databaseResponse'
import * as React from 'react'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'
import { PlusIcon } from '@radix-ui/react-icons'
import { getTodoStates } from '@renderer/services/todos'

export function CreateTodoPage() {
  const [states, setStates] = React.useState<State[]>([])
  const setWindowTitle = useConfigContext((s) => s.setDinamicTitle)

  React.useEffect(() => {
    setWindowTitle('create todo')
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
        <RadioGroup.Root defaultValue="1" className="pt-2">
          <Flex gap="4">
            {states.length &&
              states.map((state) => (
                <Text key={state.id} as="label" size="2">
                  <Flex gap="2">
                    <RadioGroup.Item value={state.id.toString()} /> {state.name}
                  </Flex>
                </Text>
              ))}
          </Flex>
        </RadioGroup.Root>
        <div className="flex justify-end py-8">
          <Tooltip content="Create Todo">
            <IconButton radius="full" size="2">
              <PlusIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Section>
    </Box>
  )
}
