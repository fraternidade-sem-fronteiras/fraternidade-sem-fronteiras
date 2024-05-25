import { useUser } from '@/hooks/user.hook'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { light, dark } from '@/themes/chakra/chakra.theme'

export default function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { theme: currentTheme } = useUser()

  const theme = currentTheme === 'light' ? light : dark

  return (
    <div data-theme={currentTheme} style={{ minHeight: '100vh' }}>
      <ColorModeScript initialColorMode={'light'} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </div>
  )
}
