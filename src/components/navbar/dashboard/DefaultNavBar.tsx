import LogoutModal from '../../LogoutModal.jsx'
import { Link, useLocation } from 'react-router-dom'

import {
  Avatar,
  Button,
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
  const location = useLocation()

  const {
    hasPermission,
    hasAtLeastOnePermission,
    user: volunteer,
    toggleColorMode,
    theme,
    onOpenLogoutModal,
  } = useUser()

  const avatarUrl = volunteer?.avatarUrl || 'https://bit.ly/dan-abramov'

  const isVoluntarioPath = location.pathname.includes('/voluntario/')
  const isAssistidoPath = location.pathname.includes('/assistido/')
  const isCargoPath = location.pathname.includes('/cargo/')
  const isRelatorioPath = location.pathname.includes('/relatorio/')
  const isFilaPath = location.pathname.includes('/fila/')

  return (
    <div className="flex h-[100px] w-full bg-light-blue">
      <div className="flex-1 flex ml-4 my-auto">
        <Link to="/dashboard/navegar">
          <picture>
            <img
              className="h-20 w-20"
              src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
            />
          </picture>
        </Link>
      </div>

      <div className="flex-1 flex w-full items-center w-max-[80%]">
        {hasAtLeastOnePermission(['CREATE_VOLUNTEER', 'DELETE_VOLUNTEER']) && (
          <Menu>
            <MenuButton className={'h-full px-2' + (isVoluntarioPath ? ' bg-pink' : '')}>
              <Text color={'white'} fontSize="large">
                Voluntários
              </Text>
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
            <MenuButton className={'h-full px-2' + (isAssistidoPath ? ' bg-pink' : '')}>
              <Text color={'white'} fontSize="large">
                Assistidos
              </Text>
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
            <MenuButton className={'h-full px-2' + (isCargoPath ? ' bg-pink' : '')}>
              <Text color={'white'} fontSize="large">
                Cargos
              </Text>
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
          <Link
            className={'h-full px-2 flex items-center' + (isRelatorioPath ? ' bg-pink' : '')}
            to="/dashboard/relatorio/"
          >
            <Text color={'white'} fontSize="large">
              Relatório
            </Text>
          </Link>
        )}

        {hasPermission('MANAGE_ASSISTED') && (
          <Link
            className={'h-full px-2 flex items-center' + (isFilaPath ? ' bg-pink' : '')}
            to="/dashboard/fila/"
          >
            <Text color={'white'} fontSize="large">
              Fila
            </Text>
          </Link>
        )}
      </div>

      <div className="flex-1 w-full flex justify-end mr-4 my-auto">
        <Button colorScheme="" onClick={toggleColorMode}>
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Menu>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
            <Avatar name={volunteer?.name} src={avatarUrl} />
          </MenuButton>
          <MenuList>
            <MenuItem>Configurações</MenuItem>
            <MenuDivider />
            <MenuItem onClick={onOpenLogoutModal}>Sair da conta</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  )
}
