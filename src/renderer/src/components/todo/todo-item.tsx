import React from 'react'
import { TodoResponse } from '$globalTypes/globals'
import { ArchiveIcon, CheckIcon } from '@radix-ui/react-icons'
import { Badge, Box, Card, Heading, IconButton, Text } from '@radix-ui/themes'
import { getTimeAgo } from '@renderer/utils'

interface ItemProps {
  todo: TodoResponse
}

export const TodoItem: React.FC<ItemProps> = ({ todo }) => {
  const timestamp = new Date(`${todo.created_date} ${todo.created_time}`)
  const timeAgo = getTimeAgo(timestamp)

  return (
    <Box key={todo.todo_id} className="flex justify-between gap-8">
      <Card asChild variant="classic" className="p-4 w-full">
        <a href="#">
          <header className="flex gap-4 items-center py-4 ">
            <Heading as="h4">{todo.todo_name}</Heading>
          </header>

          <footer className="flex justify-between items-center w-full text-zinc-400">
            <Box className="flex gap-4">
              <Badge radius="large" size="1" className="h-8">
                {todo.state_name}
              </Badge>
              <div className="flex gap-2 items-center">
                <Text size="1">{timeAgo}</Text>
              </div>
            </Box>

            <Box className="w-60 text-end">
              <Text as="p" className="text-zinc-400 truncate" size="1">
                {todo.todo_description}
              </Text>
            </Box>
          </footer>
        </a>
      </Card>

      <Box className="flex justify-between items-start gap-2">
        <IconButton variant="soft" color="grass" size="4">
          <CheckIcon />
        </IconButton>
        <IconButton variant="soft" color="amber" size="4">
          <ArchiveIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
