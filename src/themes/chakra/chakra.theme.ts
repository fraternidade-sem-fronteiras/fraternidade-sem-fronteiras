import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

const light = extendTheme(
  {
    colors: {
      pink: {
        50: '#F5E1F7',
        100: '#E2BCEC',
        200: '#CF97E1',
        300: '#BC72D6',
        400: '#A94DCF',
        500: '#9D2D88',
        600: '#7A226C',
        700: '#581850',
        800: '#350D34',
        900: '#120518',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'pink',
    components: ['Button'],
  })
)

const dark = extendTheme(
  {
    colors: {},
  },
  withDefaultColorScheme({
    colorScheme: 'pink',
    components: ['Button'],
  })
)

export { light, dark }
