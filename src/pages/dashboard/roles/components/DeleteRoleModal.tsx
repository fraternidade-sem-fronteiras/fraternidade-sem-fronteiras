import Role from '@/entities/role.entity'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactElement, cloneElement } from 'react'

// children as button

interface DeleteRoleModalProps {
  role: Role
  handleDeleteRole: () => void
  children: ReactElement
}

export default function DeleteRoleModal({
  role,
  handleDeleteRole,
  children,
}: Readonly<DeleteRoleModalProps>) {
  const { onOpen, isOpen, onClose } = useDisclosure()

  return (
    <>
      {cloneElement(children, {
        onClick: onOpen,
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Excluir cargo {role.name}</ModalHeader>
          <ModalBody className="my-4">
            <Text>Você realmente deseja excluir permanentemente esse cargo?</Text>
            <Text color="red">Essa ação não poderá ser desfeita</Text>
          </ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar ação
            </Button>
            <Button colorScheme="red" onClick={handleDeleteRole}>
              Excluir permanentemente
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
