import React from 'react'
import Volunteer from '../../entities/volunteer.entity.js'
import getAxiosInstance from '../../utils/axios.instance.js'
import VolunteerInfo from './components/VolunteerInfo.jsx'

import './styles/Volunteer.scss'

export default function SearchVolunteerPage() {
  const [volunteers, setVolunteers] = React.useState<Volunteer[]>([])
  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    retrieveVolunteers()
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value

    const filters = { name: search }

    getAxiosInstance()
      .get<Volunteer[]>('volunteers', { params: filters })
      .then((response) => setVolunteers(response.data))
      .catch((error) => console.log('Erro ao buscar os voluntários...', error))

    setSearch(search)
  }

  const retrieveVolunteers = () => {
    getAxiosInstance()
      .get<Volunteer[]>('volunteers')
      .then((response) => setVolunteers(response.data))
      .catch((error) => console.log('Erro ao buscar os voluntários...', error))
  }

  return (
    <>
      <div className="navbar-bg-base-100">
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Digite o nome"
              className="input input-bordered w-24 md:w-auto"
              value={search}
              onChange={handleSearch}
            />
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline">Filtro</button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Email</th>
              <th>Nível de Permissão</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody>
            {volunteers.map((volunteer) => (
              <>
                <VolunteerInfo key={volunteer.id} volunteer={volunteer} />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
