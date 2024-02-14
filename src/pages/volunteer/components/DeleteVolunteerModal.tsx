import Volunteer from '../../../entities/volunteer.entity.js'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react'

interface DeleteVolunteerModalProps {
  volunteer: Volunteer
  isOpen: boolean
  onClose: () => void
}

export default function DeleteVolunteerModal({
  volunteer,
  isOpen,
  onClose,
}: Readonly<DeleteVolunteerModalProps>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Excluir voluntário {volunteer.name}</ModalHeader>
        <ModalBody>
          <p>Você realmente deseja excluir permanentemente esse voluntário?</p>
          <p className="text-red-500">Essa ação não poderá ser desfeita</p>
          <br />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancelar ação
          </Button>
          <Button colorScheme="red">Excluir permanentemente</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
