import { Todo } from '$globalTypes/databaseResponse'
import { ArchiveIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex, IconButton } from '@radix-ui/themes'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'
import { update } from '@renderer/services/todos'

export const ArchiveTodoButton = ({ todo }: { todo: Todo }) => {
  const revalidateTodoList = useConfigContext((s) => s.setListRevalidation)
  const archiveTodo = () => {
    console.log(todo.id)
    const archiveTodo: Todo = {
      ...todo,
      archived: true
    }
    update(archiveTodo).then(() => {
      revalidateTodoList(true)
    })
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <IconButton>
          <ArchiveIcon />
        </IconButton>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Archive Todo</AlertDialog.Title>
        <AlertDialog.Description size="2">Are you sure?</AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={archiveTodo}>
              Archive
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
