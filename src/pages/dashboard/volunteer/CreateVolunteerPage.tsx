import vine from '@vinejs/vine'
import vineResolver from '@/utils/vine.resolver'
import useToast from '@/hooks/toast.hook'
import axios from '@/utils/axios.instance'
import Role from '@/entities/role.entity'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextoSublinhado } from '@/components/TextoSublinhado'
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
} from '@chakra-ui/react'
import { Infer } from '@vinejs/vine/types'

const formSchema = vine.object({
  name: vine.string().minLength(3).maxLength(64),
  email: vine.string().minLength(3).maxLength(64).email(),
  roles: vine.array(vine.string().uuid()),
})

type FormProps = Infer<typeof formSchema>

export default function CreateVolunteerPage() {
  const { handleToast, handleErrorToast } = useToast()
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: vineResolver(formSchema, {
      'name.minLength': 'O nome é obrigatório',
      'name.maxLength': 'O nome deve ter no máximo 64 caracteres',
      'email.required': 'O email é obrigatório',
      'email.minLength': 'O email precisa ter pelo menos 3 caracteres',
      'email.maxLength': 'O email deve ter no máximo 64 caracteres',
      'email.email': 'O email deve ser um email válido',
      'password.minLength': 'A senha é obrigatória',
    }),
  })

  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    axios
      .get('/roles')
      .then(({ data }) => {
        setRoles(data)
      })
      .catch(({ response }) => {
        handleErrorToast(
          'Erro ao buscar cargos',
          response?.data?.message ??
            'Ocorreu um erro ao buscar os cargos, verifique sua conexão e tente novamente.'
        )
      })
  }, [])

  const onSubmit = async (data: FormProps) => {
    axios
      .post('/volunteers', data)
      .then(() => {
        handleToast('Sucesso!', 'O voluntário foi cadastrado com sucesso!')
      })
      .catch(({ response }) => {
        handleErrorToast(
          'Erro ao cadastrar voluntário',
          response?.data?.message ??
            'Não foi possível fazer o cadastro de usuário, verifique sua conexão e tente novamente.'
        )
      })
  }

  const isInvalid = (name: keyof FormProps) => {
    return !!errors[name]
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} padding={'2rem'} width={'100%'}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <TextoSublinhado>Cadastro do voluntário</TextoSublinhado>

        <Grid templateColumns="2fr 1fr" paddingTop="10" gap={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('name')}>
              <FormLabel>Nome completo</FormLabel>
              <Input placeholder="Digite o nome completo" {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('email')}>
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="2fr 1fr" paddingTop="10" gap={'1rem'}>
          <GridItem>
            <FormControl>
              <FormLabel>Cargo no sistema</FormLabel>
              <CheckboxGroup onChange={(value: string[]) => setValue('roles', value)}>
                <Stack spacing={[1, 3]} direction={['column', 'row']}>
                  {roles.map((role) => (
                    <Checkbox key={role.id} value={role.id}>
                      {role.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
              <FormErrorMessage>{errors.roles?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Data de nascimento</FormLabel>
              <Input type="date" />
            </FormControl>
          </GridItem>
        </Grid>

        <Center paddingTop={'50px'}>
          <Button type="submit" width={'40%'} colorScheme="blue">
            Enviar
          </Button>
        </Center>
      </form>
    </Flex>
  )
}
