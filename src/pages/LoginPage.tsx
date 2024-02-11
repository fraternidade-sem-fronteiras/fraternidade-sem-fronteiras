import React from 'react'

import './styles/Login.scss'
import useUser from '../hooks/useUser.js'
import { useToast } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export default function LoginPage() {
  const { createSession, isLoggedIn } = useUser()
  const { redirect } = useParams()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)
  const [tryingLogin, setTryingLogin] = React.useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  React.useEffect(() => {
    if (isLoggedIn) navigate(redirect ?? '/dashboard/')
  }, [])

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    event.preventDefault()
  }

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    event.preventDefault()
  }

  const handleChangeRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(event.target.checked)
    event.preventDefault()
  }

  /**
   * Irá fazer a requisição para o endpoint de login, passando email, senha e rememberMe.
   *
   */

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    setTryingLogin(true)
    console.log(rememberMe)

    toast.promise(
      createSession(email, password)
        .then(() =>
          navigate(location.pathname == '/' ? redirect ?? '/dashboard/' : location.pathname)
        )
        .finally(() => setTryingLogin(false)),
      {
        success: {
          title: 'Logado com sucesso!',
          description: 'Seja bem-vindo de volta!',
          position: 'top-right',
          duration: 1000,
        },
        error: {
          title: 'Logando',
          description: 'Não foi possível fazer o login, tente novamente mais tarde.',
          position: 'top-right',
          duration: 4000,
        },
        loading: {
          title: 'Logando',
          description: 'Seu login está sendo processado...',
          position: 'top-right',
          duration: 10000,
        },
      }
    )
    event.preventDefault()
  }

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

          <h1 className="text-5xl font-bold">Entrar</h1>
          <p className="py-6">Por favor, faça o login para continuar.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                className="input input-bordered"
                type="text"
                placeholder="exemplo@email.com"
                value={email}
                onChange={handleChangeEmail}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Senha</span>
              </label>
              <input
                className="input input-bordered"
                type="text"
                placeholder="Senha"
                value={password}
                onChange={handleChangePassword}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Esqueci minha senha!
                </a>
              </label>
              <label className="cursor-pointer label">
                <span className="label-text">Lembre-me</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  onChange={handleChangeRememberMe}
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={tryingLogin} onClick={handleSubmit}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
