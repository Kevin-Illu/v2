import { GearIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Em, Flex, HoverCard, IconButton, Text } from '@radix-ui/themes'
import { ActionView } from './action-view'
import { useAuthContext } from '@renderer/hooks/useAuthContext'
import { User } from '$globalTypes/models'

export const NavBar = () => {
  const {
    state: { user, isRegistered }
  } = useAuthContext()

  return (
    <div className="w-full px-4 py-1 border-b-[1px] border-zinc-200 dark:border-zinc-800 max-h-14 flex justify-between items-center">
      <Box className="flex justify-start items-center w-[20%]">
        <Text weight="bold">
          <Em>v2</Em>
        </Text>
      </Box>
      <Box className="text-center flex justify-between items-center col-start-2 col-end-6 w-[60%]">
        <Box className="relative w-full py-4 flex items-center justify-center">
          <ActionView />
        </Box>
      </Box>
      <Box className="text-end flex justify-end items-center w-[20%]">
        <Flex gap="3" align="center">
          {isRegistered && user ? <UserCard {...user} /> : null}
          <IconButton variant="ghost" size="1">
            <GearIcon width="24" height="24" />
          </IconButton>
        </Flex>
      </Box>
    </div>
  )
}

const UserCard: React.FC<User> = ({ name, email }) => {
  const firstLetter = name[0]

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <IconButton variant="outline" size="1">
          <Avatar fallback={firstLetter} size="1" />
        </IconButton>
      </HoverCard.Trigger>
      <HoverCard.Content size="1">
        <Flex align="center" gap="4">
          <Box>
            <Avatar fallback={firstLetter} size="4" />
          </Box>
          <Box>
            <Text as="p" className="font-semibold">
              {name}
            </Text>
            <Text as="p">{email}</Text>
          </Box>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
