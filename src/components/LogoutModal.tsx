import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react'
import useUser from '../hooks/user.hook.js'
import { useNavigate } from 'react-router-dom'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LogoutModal({ isOpen, onClose }: Readonly<LogoutModalProps>) {
  const { finishSession } = useUser()
  const toast = useToast()

  const navigate = useNavigate()

  function handleLogout() {
    finishSession().finally(() => {
      navigate('/login')
      toast({
        title: 'Sessão finalizada',
        description: 'Você foi deslogado com sucesso',
        status: 'success',
        duration: 1500,
        position: 'top-right',
        isClosable: true,
      })
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tem certeza que deseja sair?</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar ação
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Sair
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
