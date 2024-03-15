import React, { useEffect, useState } from 'react'
import Volunteer from '../../entities/volunteer.entity.js'
import axios from '../../utils/axios.instance.js'
import PaginableTable from '../../components/table/PaginableTable.jsx'

import {
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useToast,
} from '@chakra-ui/react'
import { useDebounce } from '../../hooks/debounce.hook.js'
import { Link } from 'react-router-dom'

const SortingOptions = {
  id: 'Identificador',
  name: 'Nome',
  email: 'Email',
  levelId: 'Nível de Permissão',
  createdAt: 'Data de criação',
}

const Badge = ({ levelId }: { levelId: number }): React.ReactNode => {
  const levels: { [key: number]: React.ReactNode } = {
    1: <div className="badge badge-outline">Administrador</div>,
    2: <div className="badge badge-primary badge-outline">Psicólogo</div>,
    3: <div className="badge badge-secondary badge-outline">Voluntário</div>,
    4: <div className="badge badge-accent badge-outline">Médico</div>,
  }

  return levels[levelId]
}

export default function SearchVolunteerPage() {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(true)

  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [search, setSearch] = useState('')

  const [roleFilters, setRoleFilters] = useState<string[]>(['1', '2', '3', '4'])

  const [sortingBy, setSortingBy] = useState<keyof typeof SortingOptions>('id')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  const filteredVolunteers = volunteers
    .filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((volunteer) => roleFilters.includes(volunteer.levelId.toString()))
    .sort((a, b) => {
      if (sort == 'asc') {
        return a[sortingBy] > b[sortingBy] ? 1 : -1
      } else {
        return a[sortingBy] < b[sortingBy] ? 1 : -1
      }
    })

  const retrieveVolunteers = useDebounce(
    (page: number = 1, name: string = '', roles: string[] = []) => {
      return axios
        .get('/volunteers', {
          params: {
            page,
            name,
            roles,
            itemsPerPage: 50,
          },
        })
        .then(({ data }) => {
          if (data.length == 0) {
            console.log('No volunteers found')
            return
          }

          const newArray = volunteers.filter(
            (volunteer) => !data.some((v: any) => v.id == volunteer.id)
          )

          newArray.push(...data)
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

  const content = (volunteer: Volunteer) => {
    const createdAt = new Date(volunteer.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const createdAtTime = new Date(volunteer.createdAt).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const createdAtString = `${createdAt} às ${createdAtTime}`

    return [
      volunteer.name,
      volunteer.email,
      <Badge levelId={volunteer.levelId} />,
      createdAtString,
      <Link to={`/dashboard/voluntario/${volunteer.id}/editar-perfil`} state={volunteer}>
        <Button colorScheme="blue" width={'90%'}>
          Editar
        </Button>
      </Link>,
      <Button colorScheme="red" width={'90%'}>
        Excluir
      </Button>,
    ]
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
          <MenuList minWidth="240px">
            <MenuOptionGroup
              defaultValue="asc"
              title="Ordenar por"
              type="radio"
              value={sort}
              onChange={(value) => setSort(value as 'asc' | 'desc')}
            >
              <MenuItem
                onClick={() => {
                  const idx = Object.keys(SortingOptions).indexOf(sortingBy)
                  const next = (idx + 1) % Object.keys(SortingOptions).length
                  setSortingBy(Object.keys(SortingOptions)[next] as keyof typeof SortingOptions)
                }}
              >
                {SortingOptions[sortingBy]}
              </MenuItem>
              <MenuItemOption value="asc">Crescente</MenuItemOption>
              <MenuItemOption value="desc">Decrescente</MenuItemOption>
            </MenuOptionGroup>

            <MenuDivider />

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
        headers={[
          { name: 'Nome', width: '20%' },
          { name: 'Email', width: '20%' },
          { name: 'Nível de Permissão', width: '20%' },
          { name: 'Criado em', width: '20%' },
          { name: 'Editar', width: '10%' },
          { name: 'Excluir', width: '10%' },
        ]}
        items={filteredVolunteers}
        content={content}
        isLoading={isLoading}
        onNextPage={handleNextPage}
      />
    </>
  )
}
