import { Box, DialogTrigger, Flex, IconButton } from '@radix-ui/themes'
import { FC } from 'react'
import { Todo } from '$globalTypes/databaseResponse'
import { CheckIcon } from '@radix-ui/react-icons'

interface TodoListProps {
  todos: Todo[]
}

// TODO: mejorar este componente que se utilizara en el editable
// const renderSteps = (steps: Step[] | undefined): JSX.Element | null => {
//   if (!steps || steps.length === 0) return null

//   return (
//     <Box className="ml-4">
//       {steps.map((step) => (
//         <Box key={step.id}>
//           <p>{step.name}</p>
//           {renderSteps(step.sub_steps)}
//         </Box>
//       ))}
//     </Box>
//   )
// }

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <Box className="flex flex-col gap-4 pt-4">
      <header>
        <Flex justify="between" align="center" className="font-bold"></Flex>
      </header>

      <Flex direction="column" gap="2">
        {todos.map((todo) => (
          <TodoItem key={todo.todo_id} {...todo} />
        ))}
      </Flex>
    </Box>
  )
}

// TODO: move this to a single file
const todoItemCssClasses = `
px-6
transition-colors
rounded-full
border-[1px] border-solid
overflow-hidden
flex items-center justify-between
hover:bg-lime-100 hover:border-lime-100
`

const TodoItem = (todo: Todo) => {
  return (
    <Box key={todo.todo_id} className="py-2 rounded-xl bg-white flex flex-col gap-1">
      <Box className={todoItemCssClasses}>
        <DialogTrigger>
          <button className="w-full h-full py-4 flex">
            <p className="text-lg font-medium">{todo.todo_name}</p>
          </button>
        </DialogTrigger>
        <Box className="flex justify-between items-center gap-4">
          <IconButton variant="ghost" radius="full">
            <CheckIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

// TODO: add this while the user hover the TodoItem
{
  // <Box className="flex w-full flex-row-reverse gap-4 px-6">
  //         <Box>
  //           {todo.steps.length > 0 ? (
  //             <Text size="1" className="p-0 m-0" color="lime">
  //               {todo.steps.length} steps to complete
  //             </Text>
  //           ) : null}
  //         </Box>
  //       </Box>
}
