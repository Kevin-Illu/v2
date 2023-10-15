import { Box, Container, Heading } from '@radix-ui/themes'
import { InputTextField } from '@renderer/components'
import { Formik } from 'formik'
import * as Yup from 'yup'

export const SignUpPage = () => {
  return (
    <Box className="w-screen h-screen">
      <Container>
        <Box className="px-4">
          <Heading as="h1">
            Regístrate en nuestra aplicación y descubre una nueva forma de alcanzar tus metas y
            sueños, paso a paso. ¡Da el primer paso hacia la organización y el éxito!
          </Heading>
        </Box>
        <Box>
          <Formik
            initialValues={{
              userName: '',
              email: ''
            }}
            validationSchema={Yup.object({
              userName: Yup.string().required('Please enter a user name'),
              email: Yup.string()
                .required('Please enter a email address')
                .email('Invalid email address')
            })}
            onSubmit={(values) => {
              console.log(values)
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <InputTextField
                  name="userName"
                  placeholder="Enter your name to get started."
                  label="name:"
                  formik={formik}
                />
                <InputTextField
                  name="email"
                  label="email"
                  placeholder="Provide your email to join us on the journey."
                  formik={formik}
                />
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  )
}
