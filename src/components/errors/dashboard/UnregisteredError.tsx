import { Button, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function UnregisteredError() {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'60vh'} flexDirection={'column'}>
      <Text fontSize={'2xl'}>Oxe... que estranho, você não deveria estar vendo essa página!</Text>
      <Text fontSize={'2xl'}>
        Sua conta já existe, mas ainda não está ativa. Para ativar-lá, logue-se pela primeira vez!
      </Text>
      <Link to={'/login'}>
        <Button colorScheme="pink">Ir para página de Login</Button>
      </Link>
    </Flex>
  )
}
