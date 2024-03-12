import React, { useEffect, useState } from 'react'
import Volunteer from '../../entities/volunteer.entity.js'
import getAxiosInstance from '../../utils/axios.instance.js'

import { VolunteerInfo, VolunteerInfoSkeleton } from './components/VolunteerInfo.jsx'
import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useToast,
} from '@chakra-ui/react'
import { useDebounce } from '../../hooks/debounce.hook.js'

import './styles/Volunteer.scss'
import PaginableTable from '../../components/table/PaginableTable.jsx'

export default function SearchVolunteerPage() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)

  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [search, setSearch] = useState('')

  const [roleFilters, setRoleFilters] = useState<string[]>(['1', '2', '3', '4'])

  const filteredVolunteers = volunteers
    .filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((volunteer) => roleFilters.includes(volunteer.levelId.toString()))

  const retrieveVolunteers = useDebounce(
    (page: number = 1, name: string = '', roles: string[] = []) => {
      const filters = {
        page,
        name,
        roles,
        itemsPerPage: 50,
      }

      return getAxiosInstance()
        .get('volunteers', { params: filters })
        .then(({ data }) => {
          if (data.length == 0) return

          const newArray = volunteers.filter(
            (volunteer) => !data.some((v: any) => v.id == volunteer.id)
          )

          newArray.push(...volunteers)
          setVolunteers(newArray)
        })
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

  useEffect(() => {
    retrieveVolunteers().then(() => setIsLoading(false))
  }, [])

  const handleRoleFilter = (roles: string | string[]) => {
    setRoleFilters(roles as string[])
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    //const filters = { name: event.target.value }
    //retrieveVolunteers(currentPage, filters.name, roleFilters)
  }

  const handleNextPage = (currentPage: number, _lastPage: number, currentMaxPage: number) => {
    if (currentPage == currentMaxPage) {
      retrieveVolunteers(currentPage + 1, search, roleFilters)
    }
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

      <PaginableTable
        headers={['Nome', 'Email', 'Nível de Permissão', 'Editar', 'Excluir']}
        items={filteredVolunteers}
        content={(volunteer: Volunteer) => (
          <VolunteerInfo key={volunteer.id} volunteer={volunteer} />
        )}
        isLoading={isLoading}
        loadingSkeleton={<VolunteerInfoSkeleton />}
        onNextPage={handleNextPage}
      />
    </>
  )
}
