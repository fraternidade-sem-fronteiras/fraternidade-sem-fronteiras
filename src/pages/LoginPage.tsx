import React from 'react'
import vineResolver from '@/utils/vine.resolver'
import vine from '@vinejs/vine'
import { useForm } from 'react-hook-form'
import { useUser } from '@/hooks/user.hook'
import {
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import useToast from '@/hooks/toast.hook'
import EyeOff from '../assets/svg/eye-off.jsx'
import Eye from '../assets/svg/eye.jsx'

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

  const [isShowingPassword, setIsShowingPassword] = React.useState(false)
  const { createSession, isLoggedIn } = useUser()
  const { redirect } = useParams()

  const navigate = useNavigate()
  const location = useLocation()
  const { handleToast, handleErrorToast } = useToast()

  React.useEffect(() => {
    if (isLoggedIn) navigate(redirect ?? '/dashboard/navegar')
  }, [])

  /**
   * Irá fazer a requisição para o endpoint de login, passando email, senha e rememberMe.
   *
   */

  const handleShowPassword = () => {
    setIsShowingPassword((prevState) => !prevState)
  }

  const onSubmit = () => {
    return new Promise<void>((resolve, reject) => {
      createSession(getValues('email'), getValues('password'))
        .then(({ registered }) => {
          if (registered) {
            handleToast(
              'Conta registrada!',
              'Sua conta foi ativa e a senha registrada, seja bem vindo!'
            )
          }

          navigate(
            location.pathname == '/' || location.pathname == '/login'
              ? redirect ?? '/dashboard/navegar'
              : location.pathname
          )
          resolve()
        })
        .catch(() => {
          handleErrorToast('Logando', 'Não foi possível fazer o login, tente novamente mais tarde.')
          reject()
        })
    })
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="text-center">
        <Center>
          <Image
            boxSize={'150px'}
            src="https://www.fraternidadesemfronteiras.org.br/wp-content/uploads/2021/07/LOGO.png"
          />
        </Center>

        <Text fontSize={'xl'} as={'b'}>
          Faça login para continuar
        </Text>
      </div>

      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-base-100">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Seu email</FormLabel>
              <Input type="email" placeholder="Seu email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>Sua senha</FormLabel>
              <InputGroup>
                <Input
                  type={isShowingPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  {...register('password')}
                />
                <InputRightAddon onClick={handleShowPassword}>
                  {isShowingPassword ? <Eye/> : <EyeOff/>}
                </InputRightAddon>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <HStack justify="space-between">
              <Checkbox defaultChecked {...register('rememberMe')}>
                Manter sessão
              </Checkbox>
              <Link to="/forgot-password">
                <Text fontSize="sm">Esqueceu a senha?</Text>
              </Link>
            </HStack>

            <Button
              type="submit"
              width="100%"
              colorScheme="blue"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Logar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
