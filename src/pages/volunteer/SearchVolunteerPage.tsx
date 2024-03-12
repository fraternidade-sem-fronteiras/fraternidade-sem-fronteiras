import React, { useEffect, useState } from 'react'
import Volunteer from '../../entities/volunteer.entity.js'
import getAxiosInstance from '../../utils/axios.instance.js'
import VolunteerInfo from './components/VolunteerInfo.jsx'

import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from '@chakra-ui/react'
import './styles/Volunteer.scss'
import { useDebounce } from '../../hooks/debounce.hook.js'

function addVolunteer(array: Volunteer[], volunteers: Volunteer[]) {
  if (array.length == 0) {
    return volunteers
  }

  const newArray = array.filter((volunteer) => !volunteers.some((v) => v.id == volunteer.id))
  newArray.push(...volunteers)
  return newArray
}

export default function SearchVolunteerPage() {
  const toast = useToast()

  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [search, setSearch] = useState('')

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [roleFilters, setRoleFilters] = useState<string[]>(['1', '2', '3', '4'])

  const filteredVolunteers = volunteers
    .filter((volunteer) => volunteer.name.toLowerCase().includes(search.toLowerCase()) || volunteer.email.toLowerCase().includes(search.toLowerCase()))
    .filter((volunteer) => roleFilters.includes(volunteer.levelId.toString()))

  const currentMaxPage = Math.max(Math.round(filteredVolunteers.length / currentItemsPerPage), currentPage)

  useEffect(() => {
    retrieveVolunteers()
  }, [])

  const handleRoleFilter = (roles: string | string[]) => {
    setRoleFilters(roles as string[])
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    const filters = { name: event.target.value }
    retrieveVolunteers(currentPage, filters.name, roleFilters)
  }

  const retrieveVolunteers = useDebounce(
    (page: number = 1, name: string = '', roles: string[] = []) => {
      const filters = {
        page,
        name,
        roles,
        itemsPerPage: 50,
      }

      getAxiosInstance()
        .get('volunteers', { params: filters })
        .then(({ data }) => setVolunteers((prevState) => addVolunteer(prevState, data)))
        .catch((error) =>
          toast({
            title: 'Erro ao buscar voluntários',
            description: error.message,
            status: 'error',
            duration: 1500,
            position: 'top-right',
            isClosable: true,
          })
        )
    },
    700
  )

  const handleNextPage = () => {
    setCurrentPage((prevState) => Math.min(prevState + 1, 10))

    if (currentPage == currentMaxPage) {
      retrieveVolunteers(currentPage + 1, search, roleFilters)
    }
  }

  const handlePreviousPage = () => {
    setCurrentPage((prevState) => Math.max(prevState - 1, 1))
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleLastPage = () => {
    setCurrentPage(currentMaxPage)
  }

  const handleChangePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentItemsPerPage = Number(event.target.value)

    setCurrentItemsPerPage(currentItemsPerPage)
    setCurrentPage(Math.min(currentPage, Math.round(volunteers.length / currentItemsPerPage)))
  }

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent={'center'}
        flexDirection={'row'}
        padding="1.5rem"
        gap={6}
      >
        <Input placeholder={'Digite o nome'} width={'16rem'} onChange={handleSearch} />

        <Menu closeOnSelect={false}>
          <MenuButton as={Button} colorScheme={'blue'}>
            Filtros
          </MenuButton>
          <MenuList>
            <MenuOptionGroup
              title="Filtrar grupos"
              type="checkbox"
              value={roleFilters}
              onChange={handleRoleFilter}
            >
              <MenuItemOption value="1" defaultChecked>
                Administrador
              </MenuItemOption>
              <MenuItemOption value="2" defaultChecked>
                Psicólogo
              </MenuItemOption>
              <MenuItemOption value="3" defaultChecked>
                Voluntário
              </MenuItemOption>
              <MenuItemOption value="4" defaultChecked>
                Médico
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            <Flex alignItems="center" justifyContent={'flex-end'} gap={2}>
              <Tooltip label="Primeira Página">
                <Button isDisabled={currentPage == 1} onClick={handleFirstPage}>
                  {'«'}
                </Button>
              </Tooltip>

              <Tooltip label="Página anterior">
                <Button isDisabled={currentPage == 1} onClick={handlePreviousPage}>
                  {'<'}
                </Button>
              </Tooltip>

              {currentPage + ' de ' + currentMaxPage}

              <Select width={'10%'} value={currentItemsPerPage} onChange={handleChangePageSize}>
                {[10, 20, 30, 40, 50].map((size) => (
                  <option value={size} key={size}>
                    Mostrar {size}
                  </option>
                ))}
              </Select>

              <Tooltip label="Próxima página">
                <Button isDisabled={currentPage >= currentMaxPage} onClick={handleNextPage}>
                  {'>'}
                </Button>
              </Tooltip>

              <Tooltip label="Última página">
                <Button isDisabled={currentPage >= currentMaxPage} onClick={handleLastPage}>
                  {'»'}
                </Button>
              </Tooltip>
            </Flex>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Nível de Permissão</Th>
              <Th>Editar</Th>
              <Th>Excluir</Th>
            </Tr>
          </Thead>

          <Tbody>
            {filteredVolunteers
              .slice((currentPage - 1) * currentItemsPerPage, currentPage * currentItemsPerPage)
              .map((volunteer) => (
                <VolunteerInfo key={volunteer.id} volunteer={volunteer} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
