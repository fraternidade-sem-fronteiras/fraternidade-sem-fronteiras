import LogoutModal from '../LogoutModal.tsx'
import { useDisclosure } from '@chakra-ui/react'

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          ></ul>
        </div>
        <picture>
          <img
            style={{ width: '5rem', height: '5rem' }}
            src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
          />
        </picture>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li tabIndex={0}>
            <details>
              <summary>Adicionar</summary>
              <ul className="p-2">
                <li>
                  <a>Voluntários</a>
                </li>
                <li>
                  <a>Assistidos</a>
                </li>
              </ul>
            </details>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Buscar</summary>
              <ul className="p-2">
                <li>
                  <a>Voluntários</a>
                </li>
                <li>
                  <a>Assistidos</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Relatório</a>
          </li>
          <li>
            <a>Fila</a>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <button className="btn btn-secondary btn-sm" id="sair" onClick={onOpen}>
          Sair
        </button>

        <LogoutModal isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  )
}
