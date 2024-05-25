import { Button, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface InsufficientePermissionErrorProps {
  permissions: string[]
}

export default function InsufficientePermissionError({
  permissions,
}: Readonly<InsufficientePermissionErrorProps>) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} height={'60vh'} flexDirection={'column'}>
      {permissions.length ? (
        <>
          <Text fontSize={'2xl'}>Você não tem permissão para acessar essa página!</Text>
          <Text fontSize={'2xl'}>
            Essa página requer a(s) permissão(ões) {permissions.join(', ')}
          </Text>
        </>
      ) : (
        <>
          <Text fontSize={'2xl'}>Você não tem permissão para acessar essa página!</Text>
          <Text fontSize={'2xl'}>Somente administradores podem acessar essa página!</Text>
        </>
      )}
      <Button colorScheme="red" onClick={handleGoBack} className="my-5">
        Clique aqui para voltar
      </Button>
    </Flex>
  )
}
