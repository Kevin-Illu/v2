import { type State } from '$globalTypes/globals'
import { Flex, RadioGroup } from '@radix-ui/themes'
import { FC } from 'react'
interface StateListProps {
  states: State[]
}

export const StatesList: FC<StateListProps> = ({ states }) => {
  const filteredStates = states.filter((state) => {
    return state.id !== 4 && state.id !== 6
  })

  return (
    <RadioGroup.Root>
      <Flex justify="between" align="center">
        {filteredStates.map((state) => (
          <Flex key={state.id} gap="2" justify="between" align="center">
            <RadioGroup.Item value={state.id.toString()} /> {state.state_name}
          </Flex>
        ))}
      </Flex>
    </RadioGroup.Root>
  )
}
