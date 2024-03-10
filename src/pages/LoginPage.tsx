import React from 'react'
import vineResolver from '../utils/vine.resolver.js'
import useUser from '../hooks/user.hook.js'
import vine from '@vinejs/vine'
import { useForm } from 'react-hook-form'
import {
  Button,
  Center,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

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
  const toast = useToast()

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
      toast.promise(
        createSession(getValues('email'), getValues('password'))
          .then(() => {
            navigate(
              location.pathname == '/' || location.pathname == '/login'
                ? redirect ?? '/dashboard/navegar'
                : location.pathname
            )
            resolve()
          })
          .catch(reject),
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
                  {isShowingPassword ? 'O' : 'o'}
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
