import Role, { hasSinglePermission } from '@/entities/role.entity'
import Permission from '@/entities/permission.entity'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactElement, cloneElement } from 'react'

// children as button

interface EditRolePermissionsProps {
  role: Role
  permissions: Permission[]
  children: ReactElement
}

export default function EditRolePermissions({
  role,
  permissions,
  children,
}: Readonly<EditRolePermissionsProps>) {
  const { onOpen, isOpen, onClose } = useDisclosure()

  return (
    <>
      {cloneElement(children, {
        onClick: onOpen,
      })}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar cargo {role.name}</ModalHeader>
          <ModalBody className="my-4">
            <Card maxHeight="400px" overflowY="auto" p="1">
              <CardHeader>
                <Heading size="md">Permissões</Heading>
              </CardHeader>
              <CardBody padding="0rem">
                {permissions.map((data) => {
                  //console.log('O cargo ' + role.name + ' tem a permissão ' + data.id + '? ' + hasSinglePermission(role, data.id))
                  return (
                    <Stack key={data.id} id={data.id} divider={<StackDivider />} spacing="1">
                      <Box padding="1rem">
                        <Box display="flex" justifyContent="space-between">
                          <Heading size="xs" textTransform="uppercase" marginInlineEnd="1rem">
                            {data.name}
                          </Heading>
                          <Stack>
                            <Switch
                              size="md"
                              color="#5CC0CD"
                              defaultChecked={hasSinglePermission(role, data.id)}
                            />
                          </Stack>
                        </Box>
                        <Text pt="2" fontSize="sm">
                          {data.description}
                        </Text>
                      </Box>
                      <Divider />
                    </Stack>
                  )
                })}
              </CardBody>
            </Card>
          </ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <Button backgroundColor="#5CC0CD">Confirmar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
