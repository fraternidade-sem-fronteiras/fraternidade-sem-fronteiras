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
import { useNavigate } from 'react-router-dom'

interface SendingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SendingModal({ isOpen, onClose }: Readonly<SendingModalProps>) {
  const toast = useToast()

  const navigate = useNavigate()

  function sucessSending() {
    onClose() // Fechar o modal
    navigate('/dashboard/assistido/cadastrar')
    toast({
      title: 'Sessão finalizada',
      description: 'O cadastro foi feito com sucesso',
      status: 'success',
      duration: 1500,
      position: 'top-right',
      isClosable: true,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tem certeza que deseja enviar?</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button color="#9D2D88" onClick={sucessSending}>
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
