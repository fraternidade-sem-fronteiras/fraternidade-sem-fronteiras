import { Link } from 'react-router-dom'

import './styles/Select.scss'

export default function SelectPage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <picture>
            <img
              className="fsf-logo"
              src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
            />
          </picture>

          <h1 className="text-5xl font-bold">O que deseja fazer?</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control mt-6">
              <Link to="/dashboard/assistido/registrar" className="btn btn-primary">
                Adicionar assistido
              </Link>
              <Link to="/dashboard/assistido/procurar" className="btn btn-primary">
                Buscar assistido
              </Link>
              <Link to="/dashboard/voluntario/registrar" className="btn btn-secondary">
                Adicionar voluntário
              </Link>
              <Link to="/dashboard/voluntario/procurar" className="btn btn-secondary">
                Buscar voluntário
              </Link>
              <Link to="/dashboard/assistido/fila" className="btn btn-accent">
                Adicionar na Fila
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
