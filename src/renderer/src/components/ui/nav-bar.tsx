import { GearIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Em, Flex, IconButton, Text } from '@radix-ui/themes'
import { ActionView } from './action-view'

export const NavBar = () => {
  return (
    <div className="w-full px-4 py-2 border-b-[1px] border-zinc-200 dark:border-zinc-800 max-h-14 flex justify-between items-center">
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
          <IconButton variant="ghost">
            <GearIcon width="24" height="24" />
          </IconButton>
          <IconButton variant="outline">
            <Avatar fallback="k" size="2" />
          </IconButton>
        </Flex>
      </Box>
    </div>
  )
}
