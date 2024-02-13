import React from 'react'
import vineResolver from '../utils/vine.resolver.js'
import useUser from '../hooks/useUser.js'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import './styles/Login.scss'
import vine from '@vinejs/vine'

const loginUserFormSchema = vine.object({
  email: vine.string().minLength(3).maxLength(64),
  password: vine.string().minLength(1).maxLength(32),

  rememberMe: vine.boolean(),
})

interface LoginProps {
  email: string
  password: string

  rememberMe: boolean
}

export default function LoginPage() {
  const {
    getValues,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<LoginProps>({
    resolver: vineResolver(loginUserFormSchema),
  })

  const { createSession, isLoggedIn } = useUser()
  const { redirect } = useParams()

  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  React.useEffect(() => {
    if (isLoggedIn) navigate(redirect ?? '/dashboard/')
  }, [])

  /**
   * Irá fazer a requisição para o endpoint de login, passando email, senha e rememberMe.
   *
   */

  const onSubmit = () => {
    toast.promise(
      createSession(getValues('email'), getValues('password')).then(() =>
        navigate(location.pathname == '/' ? redirect ?? '/dashboard/' : location.pathname)
      ),
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
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center">
          <picture>
            <img
              className="fsf-logo"
              src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
              style={{ width: '30%', height: '30%' }}
            />
          </picture>

          <h1 className="font-bold">Entrar</h1>
          <p className="py-1">Por favor, faça o login para continuar.</p>
        </div>
        <div
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 card-body"
          style={{ height: '80%' }}
        >
          <div className="form-control" style={{ padding: 0 }}>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="exemplo@email.com"
              {...register('email', {
                required: 'O campo de email é obrigatório.',
              })}
            />
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              placeholder="Senha"
              {...register('password', {
                required: 'O campo de email é obrigatório.',
              })}
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
                {...register('rememberMe', {
                  required: 'O campo de email é obrigatório.',
                })}
              />
            </label>
            <button
              className="btn btn-primary"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              style={{ width: '100%' }}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
