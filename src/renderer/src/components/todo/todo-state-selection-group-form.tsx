import { State } from '$globalTypes/globals'
import { Flex, RadioGroupItem, RadioGroupRoot, Text } from '@radix-ui/themes'
import { type FormikProps } from 'formik/dist/types'
import { FC } from 'react'

export const StateSelectionGroup: FC<{
  states: State[]
  formik: FormikProps<any>
}> = ({ states, formik }) => {
  return (
    <RadioGroupRoot name="state_id" onChange={formik.handleChange}>
      <Flex direction="row" gap="4">
        {states.map((state) => (
          <StateSelectionItem key={state.id} state={state} />
        ))}
      </Flex>
    </RadioGroupRoot>
  )
}

const StateSelectionItem: FC<{ state: State }> = ({ state }) => {
  return (
    <label key={state.id} className="flex items-center gap-3">
      <RadioGroupItem value={state.id.toString()} />
      <Text>{state.state_name}</Text>
    </label>
  )
}
