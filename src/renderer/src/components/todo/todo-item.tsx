import React from 'react'
import { TodoResponse } from '$globalTypes/globals'
import { ArchiveIcon, CheckIcon } from '@radix-ui/react-icons'
import { Badge, Box, Flex, Heading, IconButton, Text } from '@radix-ui/themes'
import { getTimeAgo } from '@renderer/utils'

interface ItemProps {
  todo: TodoResponse
}

export const TodoItem: React.FC<ItemProps> = ({ todo }) => {
  const timestamp = new Date(`${todo.created_date} ${todo.created_time}`)
  const timeAgo = getTimeAgo(timestamp)

  return (
    <Box key={todo.todo_id} className="flex justify-between gap-16">
      <Flex justify="between" gap="4" className="rounded-md w-full bg-zinc-100">
        <Box className="p-4">
          <header className="flex gap-4 rounded-md items-center py-4">
            <Heading as="h4">{todo.todo_name}</Heading>
          </header>
          <footer className="flex gap-4 text-zinc-400">
            <Badge radius="large" size="1" className="h-8">
              {todo.state_name}
            </Badge>
            <div className="flex gap-2 items-center">
              <Text size="1">{timeAgo}</Text>
            </div>
          </footer>
        </Box>
      </Flex>

      <div className="rounded-md flex justify-between items-start gap-2 pt-4">
        <IconButton variant="outline" color="gray" radius="full" size="4">
          <ArchiveIcon />
        </IconButton>
        <IconButton variant="outline" radius="full" color="gray" size="4">
          <CheckIcon />
        </IconButton>
      </div>
    </Box>
  )
}
