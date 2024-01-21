import { Button, Heading } from '@radix-ui/themes'
import { CreateTaskDialog } from './CreateTaskDialog'

export const EmptyView = () => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <Heading as="h1">Todo</Heading>
      <CreateTaskDialog>
        <Button>Create New Item</Button>
      </CreateTaskDialog>
    </div>
  )
}
