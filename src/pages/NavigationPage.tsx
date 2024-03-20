import { Link } from 'react-router-dom'

export default function NavigationPage() {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      style={{ paddingTop: '-1%', marginTop: '-1%' }}
    >
      <div className="text-center">
        <picture className="flex justify-center">
          <img
            src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
            alt="Logo da Fraternidade Sem Fronteiras"
            style={{ width: '20%', height: '20%' }}
          />
        </picture>
        <h1 className="text-xl font-bold leading-tight tracking-tight mb-5">O que deseja fazer?</h1>
      </div>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-base-100">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" action="#">
            <Link
              to="/dashboard/assistido/cadastrar"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Adicionar assistido
            </Link>
            <Link
              to="/dashboard/assistido/"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Buscar assistido
            </Link>
            <Link
              to="/dashboard/voluntario/cadastrar"
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Adicionar voluntário
            </Link>
            <Link
              to="/dashboard/voluntario/"
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              Buscar voluntário
            </Link>
            <Link
              to="/dashboard/assistido/fila"
              className="btn btn-accent"
              style={{ width: '100%' }}
            >
              Adicionar na Fila
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
