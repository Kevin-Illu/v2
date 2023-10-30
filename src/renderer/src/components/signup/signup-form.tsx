import { Formik } from 'formik'
import { InputTextField } from '../ui'
import * as Yup from 'yup'
import { User } from '$globalTypes/models'
import { Box, Button } from '@radix-ui/themes'

interface SignUpFormProps {
  onSubmit: (values: User) => void
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit: handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: ''
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Please enter a user name'),
        email: Yup.string().email('Invalid email address').required('Please enter a email address')
      })}
      onSubmit={(values) => {
        handleSubmit(values)
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="py-4 w-1/2 px-4">
          <Box className="pb-4">
            <InputTextField
              name="name"
              label="name:"
              placeholder="Enter your name to get started."
              formik={formik}
            />
            <InputTextField
              name="email"
              label="email:"
              placeholder="Provide your email to join us on the journey."
              formik={formik}
            />
          </Box>

          <Button type="submit">Continue</Button>
        </form>
      )}
    </Formik>
  )
}
