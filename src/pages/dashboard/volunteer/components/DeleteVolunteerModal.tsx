import Volunteer from '@/entities/volunteer.entity'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

interface DeleteVolunteerModalProps {
  volunteer: Volunteer
  onDelete: (volunteer: Volunteer) => void
}

export default function DeleteVolunteerModal({
  volunteer,
  onDelete,
}: Readonly<DeleteVolunteerModalProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button key={volunteer.id} colorScheme="red" width={'90%'} onClick={onOpen}>
        Excluir
      </Button>{' '}
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
            <Button colorScheme="red" onClick={() => onDelete(volunteer)}>
              Excluir permanentemente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
