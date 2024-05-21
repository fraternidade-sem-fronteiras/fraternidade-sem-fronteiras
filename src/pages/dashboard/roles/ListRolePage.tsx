import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import axios from '@/utils/axios.instance'
import DeleteRoleModal from './components/DeleteRoleModal.jsx'
import useToast from '@/hooks/toast.hook'
import Role from '@/entities/role.entity'
import { TextoSublinhado } from '@/components/TextoSublinhado'

import {
  Flex,
  
} from '@chakra-ui/react'

export default function ListRolePage() {
  const { handleToast } = useToast()
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    axios
      .get('/roles')
      .then(({ data }) => {
        setRoles(data)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }, [])

  const deleteRole = (role: Role) => {
    axios
      .delete(`/roles/${role.name}`)
      .then(() => {
        setRoles(roles.filter((r) => r.name !== role.name))
        handleToast('Sucesso!', 'O cargo ' + role.name + ' foi excluído com sucesso!')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return (
    
    <Center flexDirection={'column'} >
       <Flex  padding={'2rem'} width={'100%'}></Flex>
       <TextoSublinhado>Lista de cargos</TextoSublinhado >
      <TableContainer>
        <Table variant='simple'marginTop={'3rem'}>

          <Thead>
            <Tr>
              <Th>Cargos</Th>
              <Th>Permissões</Th>
              <Th>Editar</Th>
              <Th>Listar</Th>
              <Th>Excluir</Th>
            </Tr>
          </Thead>
          <Tbody>
            {roles.map((role) => (
              <Tr key={role.name}>
                <Td>{role.name}</Td>
                <Td>{role.permissions}</Td>
                <Td>
                  <Link to={role.name + '/editar'}>
                    <Button backgroundColor="#5CC0CD" _hover={{ backgroundColor: "#48a7b2" }}>Editar permissões</Button>
                  </Link>
                </Td>
                <Td>
                  <Link to={role.name + '/listar-usuarios'}>
                    <Button colorScheme="pink">Listar usuários</Button>
                  </Link>
                </Td>
                <Td>
                  <DeleteRoleModal role={role} handleDeleteRole={() => deleteRole(role)}>
                    <Button backgroundColor="#E61653" _hover={{ backgroundColor: "#B80C3F" }}>Excluir permissão</Button>
                  </DeleteRoleModal>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button marginTop={'3rem'} marginBottom={'3rem'}>
        <Link to="cadastrar">Criar novo cargo</Link>
      </Button>
    </Center>
  )
}
