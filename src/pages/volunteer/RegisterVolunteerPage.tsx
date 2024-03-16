import vine from '@vinejs/vine'
import vineResolver from '@/utils/vine.resolver'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useUser } from '@/hooks/user.hook'
import { TextoSublinhado } from '@/components/TextoSublinhado'
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Infer } from '@vinejs/vine/types'

const RolesOption: { [key: string]: string } = {
  admin: 'Administrador',
  psicologo: 'Psicológo',
  medico: 'Médico',
  voluntario: 'Voluntário',
}

const formSchema = vine.object({
  fullName: vine.string().minLength(3).maxLength(64),

  email: vine.string().minLength(3).maxLength(64).email(),
  role: vine.array(vine.string().in(Object.keys(RolesOption))),
})

type FormProps = Infer<typeof formSchema>

export default function RegisterVolunteerPage() {
  const {
    getValues,
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    resolver: vineResolver(formSchema, {
      'fullName.minLength': 'O nome é obrigatório',
      'fullName.maxLength': 'O nome deve ter no máximo 64 caracteres',
      'email.required': 'O email é obrigatório',
      'email.minLength': 'O email precisa ter pelo menos 3 caracteres',
      'email.maxLength': 'O email deve ter no máximo 64 caracteres',
      'email.email': 'O email deve ser um email válido',
      'password.minLength': 'A senha é obrigatória',
    }),
  })

  const toast = useToast()
  const { volunteer } = useUser()

  useEffect(() => {
    if (volunteer?.levelId !== 1) {
      toast({
        title: 'Sem permissão',
        description: 'Você não tem permissão para acessar essa página',
        position: 'top-right',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [])

  if (volunteer?.levelId !== 1) {
    return (
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        height={'60vh'}
        flexDirection={'column'}
      >
        <Text fontSize={'2xl'}>Você não tem permissão para acessar essa página</Text>
        <Text fontSize={'2xl'}>Somente administradores podem acessar essa página!</Text>
      </Flex>
    )
  }

  const onValidSubmit = async (data: FormProps) => {
    console.log(data)
  }

  const isInvalid = (name: keyof FormProps) => {
    return !!errors[name]
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} padding={'2rem'} width={'100%'}>
      <form onSubmit={handleSubmit(onValidSubmit)} style={{ width: '100%' }}>
        <TextoSublinhado>Cadastro do voluntário</TextoSublinhado>

        <Grid templateColumns="2fr 1fr" paddingTop="10" gap={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('fullName')}>
              <FormLabel>Nome completo</FormLabel>
              <Input placeholder="Digite o nome completo" {...register('fullName')} />
              <FormErrorMessage>{errors.fullName?.message}</FormErrorMessage>
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
              <Select defaultValue="" {...register('role')} multiple>
                <option value="" disabled>
                  Selecione o cargo
                </option>
                {Object.keys(RolesOption).map((role, idx) => (
                  <option key={idx} value={role}>
                    {RolesOption[role]}
                  </option>
                ))}
              </Select>
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
