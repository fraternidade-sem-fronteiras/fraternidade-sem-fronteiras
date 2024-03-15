import LogoutModal from '../LogoutModal.jsx'
import { Link } from 'react-router-dom'
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react'
import { useUser } from '../../hooks/user.hook.js'

export default function DefaultNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { volunteer } = useUser()

  return (
    <div className="navbar bg-base-100" style={{backgroundColor: "#4a7494"}}>
      <div className="navbar-start">
        <Link to="/dashboard/navegar">
          <picture>
            <img
              style={{ width: '5rem', height: '5rem' }}
              src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
            />
          </picture>
        </Link>
      </div>

      <Flex justifyContent={'space-between'} alignItems={'center'} gap={'40px'}>
        {volunteer?.levelId === 1 && (
          <Menu>
            <MenuButton>
              <Text color={'white'}>Adicionar</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/dashboard/voluntario/cadastrar">Voluntários</Link>
              </MenuItem>

              <MenuItem>
                <Link to="/dashboard/assistido/cadastrar">Assistidos</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        <Menu>
          <MenuButton>
            <Text color={'white'}>Buscar</Text>
          </MenuButton>

          <MenuList>
            <MenuItem>
              <Link to="/dashboard/voluntario/procurar">Voluntários</Link>
            </MenuItem>

            <MenuItem>
              <Link to="/dashboard/assistido/procurar">Assistidos</Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Link to="/dashboard/relatorio">
          <Text color={'white'}>Relatório</Text>
        </Link>

        <Link to="/dashboard/fila">
          <Text color={'white'}>Fila</Text>
        </Link>
      </Flex>

      <div className="navbar-end">
        <button className="btn btn-secondary btn-sm" id="sair" onClick={onOpen}>
          Sair
        </button>

        <LogoutModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  )
}
