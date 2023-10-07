import { Flex, Text, TextField } from '@radix-ui/themes'
import { FC } from 'react'

interface TextFieldInputProps {
  name: string
  label: string
  value: string
  id?: string
  placeholder?: string
}

export const TextFieldInput: FC<TextFieldInputProps> = ({ name, label, ...props }) => {
  return (
    <label>
      <Flex align="center" justify="between" direction="row">
        <Text>{label}</Text>
      </Flex>
      <TextField.Input name={name} {...props} />
    </label>
  )
}
