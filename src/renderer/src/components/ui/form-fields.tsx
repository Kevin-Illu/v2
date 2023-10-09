import { Flex, Text, TextArea, TextField } from '@radix-ui/themes'
import { FC } from 'react'
import { ErrorMessage } from 'formik'
import { FormikProps } from 'formik/dist/types'

interface TextFieldProps {
  className?: string
  style?: React.CSSProperties
  name: string
  label: string
  placeholder?: string
  formik: FormikProps<any>
}

export const InputTextField: FC<TextFieldProps> = ({ label, name, formik, ...props }) => {
  return (
    <label>
      <Flex align="center" justify="between">
        <Text>{label}</Text>
        <ErrorMessage name={name}>{(message) => <Text color="red">{message}</Text>}</ErrorMessage>
      </Flex>
      <TextField.Input {...formik.getFieldProps(name)} {...props} />
    </label>
  )
}

export const AreaTextField: FC<TextFieldProps> = ({ label, name, formik, ...props }) => {
  return (
    <label>
      <Flex align="center" justify="between">
        <Text>{label}</Text>
        <ErrorMessage name={name}>{(message) => <Text color="red">{message}</Text>}</ErrorMessage>
      </Flex>
      <TextArea {...formik.getFieldProps(name)} {...props} />
    </label>
  )
}
