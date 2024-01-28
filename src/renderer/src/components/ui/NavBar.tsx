import { ChevronLeftIcon, GearIcon } from '@radix-ui/react-icons'
import { Box, Em, Flex, IconButton, Text } from '@radix-ui/themes'
import useConfigContext from '@renderer/hooks/consumers/useConfigContext'
import { useLocation, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const title = useConfigContext((s) => s.ui.navbar.title)
  const dinamicTitle = useConfigContext((s) => s.ui.navbar.dinamicTitle)

  const goBack = () => navigate(-1)

  return (
    <div className="w-full px-4 py-1 border-b-[1px] border-zinc-200 dark:border-zinc-800 max-h-14 flex justify-between items-center">
      <Box className="flex justify-start items-center w-[20%]">
        {location.key !== 'default' && (
          <IconButton variant="ghost" onClick={goBack}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <Box className="text-center flex justify-between items-center col-start-2 col-end-6 w-[60%]">
        <Box className="relative w-full py-0 m-0 flex items-center justify-center">
          <Text weight="bold">
            <Em>{dinamicTitle || title}</Em>
          </Text>
        </Box>
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
