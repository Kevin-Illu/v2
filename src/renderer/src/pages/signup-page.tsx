import { User } from '$globalTypes/models'
import { Box, Container, Flex } from '@radix-ui/themes'
import { SignUpForm } from '@renderer/components'
import { AuthContext } from '@renderer/context/auth'
import { useContext, useState } from 'react'

interface ActionResponse {
  status: 'OK' | 'FAILED'
  message: string
}

export const SignUpPage = () => {
  const [response, setResponse] = useState<ActionResponse>({} as ActionResponse)
  const { registerNewUser } = useContext(AuthContext)

  const handleSubmit = (user: User) => {
    registerNewUser(user).then((res) => {
      if (res) {
        setResponse({
          status: 'OK',
          message: 'user created'
        })
        return
      }

      setResponse({
        status: 'FAILED',
        message: 'user creation failed'
      })
    })
  }

  return (
    <Box className="w-screen h-screen">
      <Container className="px-8 xl:px-0 h-full flex justify-center items-center">
        <div>{response?.status && <p>{response.message}</p>}</div>
        <Box className="flex flex-col bg-white p-4 rounded-lg">
          <h1 className="text-4xl xl:text-6xl font-bold">
            Sign up for our app and discover a new way to achieve your goals and dreams, one step at
            a time. Take the first step towards organization and success!
          </h1>
          <Flex justify="center" align="center" className="w-full">
            <SignUpForm onSubmit={handleSubmit} />
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
