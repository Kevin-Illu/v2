import { Box } from '@radix-ui/themes'
import { AddTodo, Layout } from '@renderer/components'

export const TodoPage = () => {
  const handleSubmit = () => {
    console.log('hola?')
  }

  return (
    <Layout>
      <Box className="h-full px-4 w-full">
        <form onSubmit={handleSubmit}>
          <label>
            <input></input>
          </label>
          <button type="submit">submit</button>
        </form>
      </Box>
      <AddTodo />
    </Layout>
  )
}
