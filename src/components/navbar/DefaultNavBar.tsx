import LogoutModal from '../LogoutModal.jsx'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useUser } from '@/hooks/user.hook'

export default function DefaultNavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { hasPermission, hasAtLeastOnePermission, volunteer, toggleColorMode, theme } = useUser()

  const avatarUrl = volunteer?.avatarUrl || 'https://bit.ly/dan-abramov'

  return (
    <div className="navbar bg-base-100" style={{ backgroundColor: '#4a7494' }}>
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
        {hasAtLeastOnePermission(['CREATE_VOLUNTEER', 'DELETE_VOLUNTEER']) && (
          <Menu>
            <MenuButton>
              <Text color={'white'}>Voluntários</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/dashboard/voluntario/">Listar voluntários</Link>
              </MenuItem>

              {hasPermission(['CREATE_VOLUNTEER']) && (
                <MenuItem>
                  <Link to="/dashboard/voluntario/cadastrar">Cadastrar voluntário</Link>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}

        {hasAtLeastOnePermission(['CREATE_ASSISTED', 'DELETE_ASSISTED']) && (
          <Menu>
            <MenuButton>
              <Text color={'white'}>Assistidos</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/dashboard/assistido/">Listar assistidos</Link>
              </MenuItem>

              {hasPermission(['CREATE_ASSISTED']) && (
                <MenuItem>
                  <Link to="/dashboard/assistido/cadastrar">Cadastrar assistido</Link>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}

        {hasAtLeastOnePermission(['CREATE_ROLE', 'EDIT_ROLE', 'DELETE_ROLE']) && (
          <Menu>
            <MenuButton>
              <Text color={'white'}>Cargos</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/dashboard/cargo">Listar cargos</Link>
              </MenuItem>

              {hasPermission(['CREATE_ASSISTED']) && (
                <MenuItem>
                  <Link to="/dashboard/cargo/cadastrar">Cadastrar cargo</Link>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}

        {hasPermission('VIEW_REPORT') && (
          <Link to="/dashboard/relatorio">
            <Text color={'white'}>Relatório</Text>
          </Link>
        )}

        {hasPermission('MANAGE_ASSISTED') && (
          <Link to="/dashboard/fila">
            <Text color={'white'}>Fila</Text>
          </Link>
        )}
      </Flex>

      <div className="navbar-end">
        <Button colorScheme="" onClick={toggleColorMode}>
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
            <Avatar name={volunteer?.name} src={avatarUrl} />
          </MenuButton>
          <MenuList>
            <MenuItem>Configurações</MenuItem>
            <MenuItem>Configurações</MenuItem>
            <MenuDivider />
            <MenuItem onClick={onOpen}>Sair da conta</MenuItem>
          </MenuList>
        </Menu>

        <LogoutModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  )
}
