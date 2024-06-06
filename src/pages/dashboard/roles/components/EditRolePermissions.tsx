import Role from '@/entities/role.entity'
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
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

const array = [
    {
        id:'123',
        name:'Criar voluntario',
        description:' Permite que os membros adicionem novos voluntários.',
    },
]

interface EditRolePermissionsProps {
    role: Role
    children: ReactElement
}

export default function EditRolePermissions({
    role,
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
                        <Card maxHeight="400px" overflowY="auto" p="4">
                            <CardHeader>
                                <Heading size='md'>Permissões</Heading>
                            </CardHeader>

                            <CardBody>
                                {array.map((role) =>
                                <Stack divider={<StackDivider />} spacing = '3'>
                                    <Box>
                                        <Box display="flex" justifyContent='space-between'>
                                            <Heading size='xs' textTransform = 'uppercase' marginInlineEnd="1rem">
                                                {role.name}
                                            </Heading>
                                            <Stack >
                                                <Switch size='md' color="#5CC0CD" />
                                            </Stack>
                                        </Box>
                                        <Text pt='2' fontSize='sm'>
                                            {role.description}
                                        </Text>
                                    </Box>
                                </Stack>
                                )}
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button backgroundColor="#5CC0CD" >
                            Confirmar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}