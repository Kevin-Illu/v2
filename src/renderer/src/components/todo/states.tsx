import { type State } from '$globalTypes/globals'
import { Select } from '@radix-ui/themes'
import { FC } from 'react'

interface StateListProps {
  states: State[]
}

export const StatesList: FC<StateListProps> = ({ states }) => {
  const filteredStates = states.filter((state) => {
    return state.id !== 4 && state.id !== 6
  })

  return (
    <Select.Root>
      <Select.Trigger placeholder="Initial state..." variant="soft" />
      <Select.Content>
        <Select.Group>
          <Select.Label>States</Select.Label>
          {filteredStates.map(({ state_name: name, id }) => (
            <Select.Item value={name} key={id}>
              {name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
