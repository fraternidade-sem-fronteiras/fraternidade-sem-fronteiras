import React, { useState } from 'react'
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

interface EditRolePermissionsProps {
  role: Role
  permissions: Permission[]
  children: React.ReactElement
}

export default function EditRolePermissions({
  role,
  permissions,
  children,
}: Readonly<EditRolePermissionsProps>) {
  const { onOpen, isOpen, onClose } = useDisclosure()

  // Estado para armazenar as permissões e se estão ativadas ou não
  const [permissionStates, setPermissionStates] = useState(
    permissions.reduce((acc, perm) => {
      acc[perm.id] = hasSinglePermission(role, perm.id)
      return acc
    }, {} as Record<string, boolean>)
  )

  const [allPermissionsEnabled, setAllPermissionsEnabled] = useState(false)

  // Função para atualizar o estado de uma permissão
  const handlePermissionChange = (permissionId: string, value: boolean) => {
    if (permissionId === 'grantAll') {
      // Se a última permissão foi clicada, ativar/desativar todas as permissões e desabilitar os switches
      const updatedStates = Object.keys(permissionStates).reduce((acc, id) => {
        acc[id] = value
        return acc
      }, {} as Record<string, boolean>)
      setPermissionStates(updatedStates)
      setAllPermissionsEnabled(value) // Se ativado, desabilita os switches
    } else {
      // Atualizar o estado de uma permissão individual, se não estiver no modo "todas ativadas"
      if (!allPermissionsEnabled) {
        setPermissionStates({
          ...permissionStates,
          [permissionId]: value,
        })
      }
    }
  }

  return (
    <>
      {React.cloneElement(children, {
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
                {permissions.map((data, index) => {
                  const isLastPermission = index === permissions.length - 1 // Verificar se é a última permissão
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
                              isChecked={permissionStates[data.id]}
                              isDisabled={allPermissionsEnabled && !isLastPermission} // Desabilitar switches exceto o último
                              onChange={(e) =>
                                handlePermissionChange(
                                  isLastPermission ? 'grantAll' : data.id,
                                  e.target.checked
                                )
                              }
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
