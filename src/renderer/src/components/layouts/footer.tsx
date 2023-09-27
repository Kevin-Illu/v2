import { Flex } from '@radix-ui/themes'
import { GitHubLogoIcon, VercelLogoIcon, FramerLogoIcon } from '@radix-ui/react-icons'

export const Footer = () => {
  return (
    <footer className="w-full h-10 bg-white border-solid border-t-[1px] px-4">
      <Flex align="center" justify="end" gap="2" className="w-full h-full">
        <GitHubLogoIcon />
        <VercelLogoIcon />
        <FramerLogoIcon />
      </Flex>
    </footer>
  )
}
