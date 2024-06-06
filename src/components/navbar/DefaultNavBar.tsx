import LogoutModal from '../LogoutModal.jsx'
import { Link, useLocation } from 'react-router-dom'

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

  const location = useLocation();

  const { hasPermission, hasAtLeastOnePermission, volunteer, toggleColorMode, theme } = useUser()

  const avatarUrl = volunteer?.avatarUrl || 'https://bit.ly/dan-abramov'

  const isVoluntarioPath = location.pathname.includes('/voluntario/');
  const isAssistidoPath = location.pathname.includes('/assistido/');
  const isCargoPath = location.pathname.includes('/cargo/');
  const isRelatorioPath = location.pathname.includes('/relatorio/');
  const isFilaPath = location.pathname.includes('/fila/');

  return (
    <div className="h-[100px] py-0 navbar bg-light-blue">
      <div className="navbar-start">
        <Link to="/dashboard/navegar">
          <picture>
            <img
              className="h-20 w-20 m-2"
              src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
            />
          </picture>
        </Link>
      </div>

      <Flex justifyContent={'space-between'} alignItems={'center'} className='h-full'>
        {hasAtLeastOnePermission(['CREATE_VOLUNTEER', 'DELETE_VOLUNTEER']) && (
          <Menu>
            <MenuButton className={"h-full px-3" + (isVoluntarioPath ? " bg-pink" : "")}>
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
            <MenuButton className={"h-full px-3" + (isAssistidoPath ? " bg-pink" : "")}>
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
            <MenuButton className={"h-full px-3" + (isCargoPath ? " bg-pink" : "")}>
              <Text color={'white'}>Cargos</Text>
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Link to="/dashboard/cargo/">Listar cargos</Link>
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
          <Link className={"h-full px-3 flex" + (isRelatorioPath ? " bg-pink" : "")} to="/dashboard/relatorio/" >
            <Text className="m-auto" color={'white'}>Relatório</Text>
          </Link>
        )}

        {hasPermission('MANAGE_ASSISTED') && (
          <Link className={"h-full px-3 flex" + (isFilaPath ? " bg-pink" : "")} to="/dashboard/fila/" >
            <Text className="m-auto" color={'white'}>Fila</Text>
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
