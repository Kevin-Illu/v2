import { type State } from '$globalTypes/globals'
import { Badge, Flex } from '@radix-ui/themes'
import { FC } from 'react'

interface StateListProps {
  states: State[]
}

export const StatesList: FC<StateListProps> = ({ states }) => {
  return (
    <Flex gap="2" justify="start">
      {states.map(({ id, name }) => (
        <Badge variant="solid" key={id}>
          {name}
        </Badge>
      ))}
    </Flex>
  )
}
