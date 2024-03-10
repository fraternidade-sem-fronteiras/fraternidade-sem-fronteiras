import useUser from '../hooks/user.hook.js'
import { ChakraProvider } from '@chakra-ui/react'

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme } = useUser()

  return (
    <div data-theme={theme}>
      <ChakraProvider>{children}</ChakraProvider>
    </div>
  )
}
