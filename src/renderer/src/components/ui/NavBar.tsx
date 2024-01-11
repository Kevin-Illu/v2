import { GearIcon } from '@radix-ui/react-icons'
import { Box, Em, Flex, IconButton, Text } from '@radix-ui/themes'

export const NavBar = () => {
  return (
    <div className="w-full px-4 py-1 border-b-[1px] border-zinc-200 dark:border-zinc-800 max-h-14 flex justify-between items-center">
      <Box className="flex justify-start items-center w-[20%]">
        <Text weight="bold">
          <Em>v2</Em>
        </Text>
      </Box>
      <Box className="text-center flex justify-between items-center col-start-2 col-end-6 w-[60%]">
        <Box className="relative w-full py-4 flex items-center justify-center"></Box>
      </Box>
      <Box className="text-end flex justify-end items-center w-[20%]">
        <Flex gap="3" align="center">
          <IconButton variant="ghost" size="1">
            <GearIcon width="24" height="24" />
          </IconButton>
        </Flex>
      </Box>
    </div>
  )
}
