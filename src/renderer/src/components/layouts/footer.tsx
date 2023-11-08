import { Flex } from '@radix-ui/themes'
import { FramerLogoIcon } from '@radix-ui/react-icons'

export const Footer = () => {
  return (
    <footer className="w-full h-10 border-solid border-t-[1px] border-zinc-200 dark:border-zinc-800 px-4">
      <Flex align="center" justify="end" gap="2" className="w-full h-full">
        <FramerLogoIcon />
      </Flex>
    </footer>
  )
}
