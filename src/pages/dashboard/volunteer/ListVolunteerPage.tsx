import React, { useEffect, useState } from 'react'
import Volunteer from '@/entities/volunteer.entity'
import axios from '@/utils/axios.instance'
import PaginableTable from '@/components/table/PaginableTable'

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
} from '@chakra-ui/react'
import { useDebounce } from '@/hooks/debounce.hook'
import { Link } from 'react-router-dom'
import Role from '@/entities/role.entity'
import useToast from '@/hooks/toast.hook'
import DeleteVolunteerModal from './components/DeleteVolunteerModal.jsx'
import Edit from '../../../assets/svg/edit.jsx'
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons'
import { useUser } from '@/hooks/user.hook'

const SortingOptions = {
  id: 'Identificador',
  name: 'Nome',
  email: 'Email',
  createdAt: 'Data de criação',
}

export default function ListVolunteerPage() {
  const { handleErrorToast } = useToast()
  const { hasPermission } = useUser()
  const [isLoading, setIsLoading] = useState(true)

  const [roles, setRoles] = useState<Role[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [search, setSearch] = useState('')

  const [roleFilters, setRoleFilters] = useState<string[]>([])

  const [sortingBy, setSortingBy] = useState<keyof typeof SortingOptions>('id')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  const filteredVolunteers = volunteers
    .filter(
      (volunteer) =>
        volunteer.name.toLowerCase().includes(search.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(search.toLowerCase())
    )
    .filter((volunteer) => volunteer.roles.some((role) => roleFilters.includes(role.name)))
    .sort((a, b) => {
      if (sort == 'asc') {
        return a[sortingBy] > b[sortingBy] ? 1 : -1
      } else {
        return a[sortingBy] < b[sortingBy] ? 1 : -1
      }
    })

  const retrieveVolunteers = useDebounce(
    async (page: number = 1, name: string = '', roles: string[] = []) => {
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
          if (data.data.length == 0) {
            return
          }

          const newArray = volunteers.filter(
            (volunteer) => !data.data.some((v: any) => v.id == volunteer.id)
          )

          newArray.push(...data.data)
          setVolunteers(newArray)
        })
        .catch((error) => handleErrorToast('Erro ao buscar voluntários', error.message))
    },
    700
  )

  useEffect(() => {
    Promise.all([
      retrieveVolunteers(),
      axios.get('/roles').then(({ data }) => {
        setRoles(data)
        setRoleFilters(data.map((role: { name: string }) => role.name))
      }),
    ])
      .catch(({ response }) => {
        handleErrorToast(
          'Erro ao buscar os voluntários',
          response?.data?.message ??
            'Ocorreu um erro ao buscar os voluntários, verifique sua conexão e tente novamente.'
        )
      })
      .finally(() => setIsLoading(false))
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
    const date = new Date(volunteer.createdAt)
    const createdAt = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const createdAtTime = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })

    const handleDeleteVolunteer = () => {
      axios
        .delete(`/volunteers/${volunteer.id}`)
        .then(() => {
          setVolunteers(volunteers.filter((v) => v.id != volunteer.id))
        })
        .catch(({ response }) => {
          handleErrorToast(
            'Erro ao excluir voluntário',
            response?.data?.message ??
              'Ocorreu um erro ao excluir o voluntário, verifique sua conexão e tente novamente.'
          )
        })
    }

    return [
      volunteer.name,
      volunteer.email,
      <div key={volunteer.id}>
        {volunteer.roles.map((role) => (
          <div key={role.name} className="block mx-2 my-2 badge badge-outline">
            {role.name}
          </div>
        ))}
      </div>,
      `${createdAt} às ${createdAtTime}`,
      <Link
        key={volunteer.id}
        to={`/dashboard/voluntario/${volunteer.id}/editar-perfil`}
        state={volunteer}
      >
        <Flex justify="center" align="center">
          {hasPermission('EDIT_VOLUNTEER') ? <Edit /> : <SearchIcon />}
        </Flex>
      </Link>,
      <DeleteVolunteerModal
        key={volunteer.id}
        volunteer={volunteer}
        handleDeleteVolunteer={handleDeleteVolunteer}
      >
        <Flex justify="center" align="center">
          <DeleteIcon width={6} height={6} />
        </Flex>
      </DeleteVolunteerModal>,
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
              {roles.map((role) => (
                <MenuItemOption key={role.name} value={role.name} defaultChecked>
                  {role.name}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Flex>

      <PaginableTable
        headers={[
          { name: 'Nome', width: '20%' },
          { name: 'Email', width: '20%' },
          { name: 'Nível de Permissão', width: '24%' },
          { name: 'Criado em', width: '20%' },
          { name: hasPermission('EDIT_VOLUNTEER') ? 'EDITAR' : 'VISUALIZAR', width: '8%' },
          { name: 'Excluir', width: '8%' },
        ]}
        items={filteredVolunteers}
        content={content}
        isLoading={isLoading}
        onNextPage={handleNextPage}
      />
    </>
  )
}
