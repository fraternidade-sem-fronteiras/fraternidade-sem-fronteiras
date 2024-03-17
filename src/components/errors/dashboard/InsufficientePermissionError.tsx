import { Flex, Text } from '@chakra-ui/react'

export default function InsufficientePermissionError() {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'60vh'} flexDirection={'column'}>
      <Text fontSize={'2xl'}>Você não tem permissão para acessar essa página</Text>
      <Text fontSize={'2xl'}>Somente administradores podem acessar essa página!</Text>
    </Flex>
  )
}
