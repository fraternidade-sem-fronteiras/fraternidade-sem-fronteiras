import React from 'react'
import vineResolver from '../utils/vine.resolver.js'
import useUser from '../hooks/useUser.js'
import vine from '@vinejs/vine'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const loginUserFormSchema = vine.object({
  email: vine.string().minLength(3).maxLength(64).email(),
  password: vine.string().minLength(1),

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
    formState: { isSubmitting, errors },
  } = useForm<LoginProps>({
    resolver: vineResolver(loginUserFormSchema, {
      'email.minLength': 'O email é obrigatório',
      'email.maxLength': 'O email deve ter no máximo 64 caracteres',
      'email.email': 'O email deve ser um email válido',
      'password.minLength': 'A senha é obrigatória',
    }),
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
        navigate(
          location.pathname == '/' || location.pathname == '/login'
            ? redirect ?? '/dashboard/'
            : location.pathname
        )
      ),
      {
        success: {
          title: 'Logado com sucesso!',
          description: 'Seja bem-vindo de volta!',
          position: 'top-right',
          duration: 500,
        },
        error: {
          title: 'Logando',
          description: 'Não foi possível fazer o login, tente novamente mais tarde.',
          position: 'top-right',
          duration: 2000,
        },
        loading: {
          title: 'Logando',
          description: 'Seu login está sendo processado...',
          position: 'top-right',
          duration: 15000,
        },
      }
    )
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="text-center">
        <picture className="flex justify-center">
          <img
            src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
            style={{ width: '30%', height: '30%' }}
          />
        </picture>
        <h1 className="text-xl font-bold leading-tight tracking-tight mb-5">
          Faça login para continuar
        </h1>
      </div>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-base-100">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Seu email
              </label>
              <input
                type="email"
                id="email"
                className="border sm:text-sm rounded-lg block w-full p-2.5 bordered :invalid:border-red-500"
                placeholder="Seu email"
                required
                {...register('email')}
              />
              {errors.email &&
                errors.email.message?.split(', ').map((error) => (
                  <span className="text-xs text-red-500" key={error}>
                    {error}
                  </span>
                ))}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium">
                Sua senha
              </label>
              <input
                type="password"
                id="password"
                placeholder="Sua senha"
                className="border sm:text-sm rounded-lg block w-full p-2.5 bordered"
                required
                {...register('password')}
              />
              {errors.password &&
                errors.password.message?.split(', ').map((error) => (
                  <span className="text-xs text-red-500" key={error}>
                    {error}
                  </span>
                ))}
            </div>
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Esqueceu sua senha?
              </a>
              <div className="flex items-start">
                <div className="mr-3 text-sm">
                  <label htmlFor="remember" className="text-sm font-medium text-primary-600 ">
                    Lembre me
                  </label>
                </div>
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="toggle toggle-primary"
                    required
                    {...register('rememberMe')}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%' }}
              onClick={handleSubmit(onSubmit)}
            >
              Logar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
