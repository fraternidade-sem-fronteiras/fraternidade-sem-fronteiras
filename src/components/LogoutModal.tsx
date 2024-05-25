import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'
import { useUser } from '../hooks/user.hook.js'
import { useNavigate } from 'react-router-dom'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LogoutModal({ isOpen, onClose }: Readonly<LogoutModalProps>) {
  const { finishSession } = useUser()

  const navigate = useNavigate()

  function handleLogout() {
    finishSession().finally(() => {
      navigate('/login')
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar sua ação</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>Tem certeza que deseja sair?</Text>
          <Text color="red">Você precisará se logar novamente após essa ação.</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Confirmar saída
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
