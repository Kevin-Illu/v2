import { Box, Flex } from '@radix-ui/themes'
import { User } from '$globalTypes/models'
import { SignUpForm } from './signup-form'
import { useState } from 'react'

interface StatusResponse {
  success: boolean
  errors: { [key: string]: string } | null
  successMessage: string | null
}

// TODO: refactor this component
export const CreateAcount = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<StatusResponse | null>()
  const AuthService = window.api.auth

  const handleSubmit = (user: User) => {
    setIsLoading(true)
    AuthService.dataAccessor<boolean>({ type: 'register-user', payload: user }).then((success) => {
      setIsLoading(false)
      if (!success) {
        setResponse({
          errors: {
            auth: 'Internal Error'
          },
          success: false,
          successMessage: null
        })

        return
      }

      setResponse({
        errors: null,
        success: true,
        successMessage: 'user successfully registered'
      })
    })
  }

  if (isLoading) {
    return <p>is loading...</p>
  }

  return (
    <Box className="flex flex-col">
      <h1 className="text-4xl xl:text-6xl font-bold">
        Sign up for our app and discover a new way to achieve your goals and dreams, one step at a
        time. Take the first step towards organization and success!
      </h1>
      <Box>{response?.success && <p>{JSON.stringify(response?.successMessage)}</p>}</Box>
      <Flex justify="end" align="center">
        <SignUpForm onSubmit={handleSubmit} />
      </Flex>

      {response?.errors && <p>{JSON.stringify(response?.errors)}</p>}
    </Box>
  )
}
