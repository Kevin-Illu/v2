import { GearIcon } from '@radix-ui/react-icons'
import { Avatar, Box, Flex, IconButton, Separator, Text } from '@radix-ui/themes'

export const NavBar = () => {
  return (
    <Box className="w-full px-4 py-2 border-b-[1px] max-h-14 flex justify-between items-center">
      <Box className="flex justify-start items-center w-[20%]">
        <Text>some text</Text>
      </Box>
      <Box className="text-center flex justify-between items-center col-start-2 col-end-6 w-[60%]">
        <Separator orientation="vertical" />
        {/* nothifications or something */}
        <Box>
          <Text>some text</Text>
        </Box>
        <Separator orientation="vertical" />
      </Box>
      <Box className="text-end flex justify-end items-center w-[20%]">
        {/* actions and user information */}
        <Flex gap="3" align="center">
          <IconButton variant="ghost">
            <GearIcon width="24" height="24" />
          </IconButton>
          <IconButton>
            <Avatar fallback="k" size="2" />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  )
}
