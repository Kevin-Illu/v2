import { PlusIcon } from '@radix-ui/react-icons'
import { Box, IconButton, Kbd, Text, Tooltip } from '@radix-ui/themes'
import { useKeyboardShortcut } from '@renderer/hotkeys'

export const AddTodo = () => {
  useKeyboardShortcut(hanldeAction, { ctrlKey: true, code: 'KeyA' })

  function hanldeAction(e) {
    e.preventDefault()
    console.log('hola?')
  }

  return (
    <Box className="absolute bottom-0 left-0 right-0 w-[36rem] md:w-[42rem] mx-auto mb-6">
      <Box className="w-full flex flex-row-reverse">
        <Tooltip content={<ToolTipContent />}>
          <IconButton type="button" radius="full" size="3" color="blue">
            <PlusIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}

const ToolTipContent = () => (
  <Text>
    add new todo <Kbd>Ctr + a</Kbd>
  </Text>
)
