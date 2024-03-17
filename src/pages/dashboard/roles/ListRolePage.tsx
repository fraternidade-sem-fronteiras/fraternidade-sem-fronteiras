import Role from '@/entities/role.entity'
import useToast from '@/hooks/toast.hook'
import axios from '@/utils/axios.instance'
import { Button, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeleteRoleModal from './components/DeleteRoleModal.jsx'

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
    <Center flexDirection={'column'} textAlign={'center'}>
      {roles.map((role) => (
        <div key={role.name} style={{ padding: '10px' }}>
          <h1>{role.name}</h1>
          {role.permissions.length ? (
            <ul>
              {role.permissions.map((permission) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          ) : (
            <p>Sem nenhuma permissão atualmente</p>
          )}
          <Link to={role.name + '/editar'}>
            <Button colorScheme="blue">Editar permissões</Button>
          </Link>

          <Link to={role.name + '/listar-usuarios'}>
            <Button colorScheme="pink">Listar usuários</Button>
          </Link>

          <DeleteRoleModal role={role} handleDeleteRole={() => deleteRole(role)}>
            <Button colorScheme="red">Excluir permissão</Button>
          </DeleteRoleModal>
        </div>
      ))}
      <Button marginTop={'3rem'}>
        <Link to="cadastrar">Criar novo cargo</Link>
      </Button>
    </Center>
  )
}
