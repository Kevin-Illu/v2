import React from 'react'
import { TodoResponse } from '$globalTypes/models'
import { ArchiveIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Badge, Box, Heading, IconButton, Text } from '@radix-ui/themes'
import { getTimeAgo } from '@renderer/utils'

interface ItemProps extends TodoResponse {}

export const TodoItem: React.FC<ItemProps> = ({
  created_date,
  created_time,
  todo_id,
  todo_archived,
  todo_description,
  todo_name,
  state_name
}) => {
  const timestamp = new Date(`${created_date} ${created_time}`)
  const timeAgo = getTimeAgo(timestamp)

  return (
    <Box key={todo_id} className="flex justify-between gap-8">
      <a
        href="#"
        className="hover:dark:border-lime-600 hover:border-lime-400 border-[2px] w-full px-8 py-4 rounded-xl border-zinc-200 dark:border-zinc-800 outline-none focus:border-lime-500 focus:dark:border-lime-800 transition-colors"
      >
        <header className="flex gap-4 py-4 justify-between items-center">
          <Heading as="h4">{todo_name}</Heading>
          <Text>
            <ChevronRightIcon />
          </Text>
        </header>

        <footer className="flex justify-between items-center w-full text-zinc-400">
          <Box className="flex gap-4">
            <Badge radius="large" size="1" className="h-8">
              {state_name}
            </Badge>
            <div className="flex gap-2 items-center">
              <Text size="1">{timeAgo}</Text>
            </div>
          </Box>

          <Box className="w-60 text-end">
            <Text as="p" className="text-zinc-400 truncate" size="1">
              {todo_description}
            </Text>
          </Box>
        </footer>
      </a>

      <Box className="flex justify-between items-start gap-2">
        <IconButton variant="soft" color="grass" size="4">
          <CheckIcon />
        </IconButton>
        <IconButton variant="soft" color="amber" disabled={!!todo_archived} size="4">
          <ArchiveIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
