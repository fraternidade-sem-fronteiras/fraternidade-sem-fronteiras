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
  Text,
} from '@chakra-ui/react'
import { ReactElement, cloneElement } from 'react'

interface DeleteVolunteerModalProps {
  volunteer: Volunteer
  handleDeleteVolunteer: () => void
  children: ReactElement
}

export default function DeleteVolunteerModal({
  volunteer,
  handleDeleteVolunteer,
  children,
}: Readonly<DeleteVolunteerModalProps>) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {cloneElement(children, {
        onClick: onOpen,
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir voluntário {volunteer.name}</ModalHeader>
          <ModalBody className="my-4">
            <Text>Você realmente deseja excluir permanentemente esse voluntário?</Text>
            <Text color="red">Essa ação não poderá ser desfeita</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar ação
            </Button>
            <Button colorScheme="red" onClick={() => handleDeleteVolunteer()}>
              Excluir permanentemente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
