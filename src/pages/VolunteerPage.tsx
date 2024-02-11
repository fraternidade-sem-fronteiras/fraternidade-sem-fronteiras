import React from 'react'
import FiltroSvg from '../assets/svg/FiltroSvg.jsx'
import NavBar from '../components/navbar/NavBar.jsx'

import './styles/Volunteer.scss'

export default function VolunteerPage() {
  React.useEffect(() => {
    retrieveVolunteers()
  }, [])

  // const handleShowModal = (volunteer: Volunteer) => {
  //   toast({
  //     title: 'Ainda não implementado',
  //     description: 'Essa funcionalidade ainda não foi implementada ' + volunteer.email,
  //     status: 'error',
  //     duration: 5000,
  //     isClosable: true,
  //   })
    // mostrar o modal
    // document.getElementById('modal-excluir-' + volunteer.id).showModal()
  // }

  const retrieveVolunteers = () => {
    // tem que adicionar os filtros de pesquisa aqui!
    // api
    //   .get('voluntario')
    //   .then((response) => setVolunteers({ volunteers: response.data }))
    //   .catch((error) => console.log('Erro ao buscar os voluntários...', error))
  }

  return (
    <div className="pagina">
      <NavBar />
      <div className="navbar-bg-base-100">
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Digite o nome"
              className="input input-bordered w-24 md:w-auto"
              // value={search}
              // onChange={handleSearch}
            />
            <div className="dropdown dropdown-end">
              <button className="btn btn-outline">
                Filtro
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <picture>
                      <FiltroSvg />
                    </picture>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <a>Mais recentes</a>
                      </li>
                      <li>
                        <a>Ordem alfabética</a>
                      </li>
                      <li>
                        <details open>
                          <summary>Nível</summary>
                          <ul>
                            <li>
                              <a>1</a>
                            </li>
                            <li>
                              <a>2</a>
                            </li>
                            <li>
                              <a>3</a>
                            </li>
                          </ul>
                        </details>
                      </li>
                    </ul>
                  </div>
                </label>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Email</th>
              <th>Nível</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody>
            {/* {volunteers.map((volunteer) => (
              <VolunteerInfo
                key={volunteer.id}
                volunteer={volunteer}
                handleShowModal={handleShowModal}
              />
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
