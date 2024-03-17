import React, { useEffect } from 'react'
import vine from '@vinejs/vine'
import vineResolver from '@/utils/vine.resolver'
import axios from '@/utils/axios.instance'
import { useForm } from 'react-hook-form'
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Switch,
  Textarea,
} from '@chakra-ui/react'

import { TextoSublinhado } from '@/components/TextoSublinhado'
import { Infer } from '@vinejs/vine/types'
import useToast from '@/hooks/toast.hook'
import { useUser } from '@/hooks/user.hook'
import { hasPermission } from '@/entities/volunteer.entity'
import InsufficientPermissionException from '@/exceptions/insufficient_permission.exception'

const formSchema = vine.object({
  name: vine.string().minLength(3).maxLength(64),
  socialName: vine.string().minLength(3).maxLength(32),

  motherName: vine.string().minLength(3).maxLength(64),
  fatherName: vine.string().minLength(3).maxLength(64),

  birthDate: vine.date(),

  country: vine.string().minLength(1),
  state: vine.string().optional().requiredWhen('country', '=', 'Brasil'),
  city: vine.string().optional().requiredWhen('country', '=', 'Brasil'),
  sexuality: vine.string().minLength(1),

  race: vine.string().minLength(1),
  gender: vine.string().minLength(1),

  cpf: vine
    .string()
    .minLength(1)
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
  rg: vine
    .string()
    .minLength(1)
    .regex(/(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d|X|x$)/),
  emission: vine.date(),
  organ: vine.string().minLength(3).maxLength(32),

  ctps: vine.string().minLength(7).maxLength(7),

  schooling: vine.string().minLength(3),

  shareData: vine.boolean(),
})

type FormProps = Infer<typeof formSchema>

export default function CreateAssistedPage() {
  const { handleToast, handleErrorToast } = useToast()
  const {
    watch,
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: vineResolver(formSchema, {
      'name.minLength': 'O nome é obrigatório e precisa ter pelo menos 3 caracteres.',
      'name.maxLength': 'O nome deve ter no máximo 64 caracteres',
      'socialName.minLength': 'O nome social é obrigatório e precisa ter pelo menos 3 caracteres.',
      'socialName.maxLength': 'O nome social deve ter no máximo 32 caracteres',
      'motherName.minLength': 'O nome da mãe é obrigatório e precisa ter pelo menos 3 caracteres.',
      'motherName.maxLength': 'O nome da mãe deve ter no máximo 64 caracteres',
      'fatherName.minLength': 'O nome do pai é obrigatório e precisa ter pelo menos 3 caracteres.',
      'fatherName.maxLength': 'O nome do pai deve ter no máximo 64 caracteres',
      'schooling.minLength': 'A escolaridade é obrigatória.',
      'sexuality.minLength': 'A sexualidade é obrigatória.',
      'gender.minLength': 'A identidade de gênero é obrigatória.',
      'race.minLength': 'A etnia é obrigatória.',
      'birthDate.date': 'A data de nascimento é obrigatória.',
      'cpf.minLength': 'O CPF é obrigatório.',
      'cpf.regex': 'O CPF é inválido.',
      'emission.date': 'A data de emissão é obrigatória.',
      'organ.minLength': 'O orgão emissor é obrigatório.',
      'rg.minLength': 'O RG é obrigatório.',
      'rg.regex': 'O RG é inválido.',
      'state.minLength': 'Selecione o estado.',
      'city.minLength': 'Selecione a cidade.',
    }),
  })

  const [countries, setCountries] = React.useState<string[]>(['Brasil'])
  const [states, setStates] = React.useState<string[]>([])
  const [cities, setCities] = React.useState<string[]>([])

  const [races, setRaces] = React.useState<string[]>([])
  const [genders, setGenders] = React.useState<string[]>([])
  const [sexuality, setSexuality] = React.useState<string[]>([])
  const [degrees, setDegrees] = React.useState<string[]>([])

  const { volunteer } = useUser()

  if (!hasPermission(volunteer, 'CREATE_ASSISTED')) throw new InsufficientPermissionException()

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/paises')
      .then(({ data }) => setCountries(data.map((pais: Record<string, any>) => pais.nome)))

    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(({ data }) => {
      setStates(data.map((estado: Record<string, any>) => estado.sigla))
      setCities([])
      setValue('state', '')
      setValue('city', '')
    })

    setRaces(['Branco', 'Preto/Negro', 'Amarelo', 'Vermelho/Índigena', 'Outro'])
    setGenders(['Homem Cisgênero', 'Mulher Cisgênero'])
    setDegrees([
      'Ensino Fundamental Incompleto',
      'Ensino Fundamental Completo',
      'Ensino Médio Incompleto',
      'Ensino Médio Completo',
      'Ensino Superior Completo',
      'Pós-Graduação',
      'Mestrado',
      'Doutorado',
      'Pós-Doutorado',
    ])
    setSexuality(['Heterosexual', 'Homosexual', 'Bissexual', 'Pansexual'])
  }, [])

  const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== 'Brasil') return

    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(({ data }) => {
        setStates(data.map((estado: Record<string, any>) => estado.sigla))
        setCities([])
        setValue('state', '')
        setValue('city', '')
      })
      .catch(() => {})

    event.preventDefault()
  }

  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' +
        event.target.value +
        '/municipios'
    )
      .then((response) => response.json())
      .then((data) => {
        setCities(data.map((cidade: Record<string, any>) => cidade.nome))
        setValue('city', '')
      })

    event.preventDefault()
  }

  const handleChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(
      'cpf',
      event.target.value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+$/, '$1')
    )
  }

  const handleChangeRg = (event: React.ChangeEvent<HTMLInputElement>) => {
    // (^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)
    setValue(
      'rg',
      event.target.value
        .toUpperCase()
        .replace(/[^\dX]/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})((\d|X){1,2})/, '$1-$2')
        .replace(/(-(\d|X))(\d|X)+$/, '$1')
    )
  }

  async function onSubmit(data: FormProps) {
    axios
      .post('/assisteds', data)
      .then(() => {
        handleToast('Assistido cadastrado com sucesso', 'O assistido foi cadastrado com sucesso.')
        reset()
      })
      .catch(({ response }) => {
        if (response) {
          handleErrorToast('Falha ao cadastrar', response.data.message)
        } else {
          handleErrorToast(
            'Falha ao cadastrar',
            'Ocorreu um erro desconhecido ao registrar o assistido, tente novamente.'
          )
        }
      })
  }

  const isInvalid = (name: keyof FormProps) => {
    return errors[name] !== undefined
  }

  return (
    <Flex justifyContent={'center'} alignItems={'center'} padding={'2rem'}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: '100%' }}>
        <TextoSublinhado>Cadastro do assistido</TextoSublinhado>
        <div className="flex justify-center items-center flex-col py-5 pb-8">
          <h1>O assistido concorda em compartilhar seus dados com a organização ?</h1>
          <Switch {...register('shareData')} />
        </div>

        <Box position="relative">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Dados pessoais
          </AbsoluteCenter>
        </Box>

        <Grid templateColumns="1.5fr 1fr 1.3fr 0.5fr" paddingTop="10" gap={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('name')}>
              <FormLabel>Nome completo</FormLabel>
              <Input placeholder="Digite o nome completo" {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('socialName')}>
              <FormLabel>Nome social</FormLabel>
              <Input placeholder="Digite o nome social" {...register('socialName')} />
              <FormErrorMessage>{errors.socialName?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('schooling')}>
              <FormLabel>Escolaridade</FormLabel>
              <Select defaultValue={1} {...register('schooling')}>
                <option key={'Sem nenhuma escolaridade'} value={1} disabled>
                  Sem nenhuma escolaridade
                </option>
                {degrees.map((degree) => (
                  <option key={degree}>{degree}</option>
                ))}
              </Select>
              <FormErrorMessage>{errors.schooling?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('birthDate')}>
              <FormLabel>Data de nascimento</FormLabel>
              <Input type="date" {...register('birthDate')} />
              <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('fatherName')}>
              <FormLabel>Nome do pai</FormLabel>
              <Input placeholder="Digite o nome do pai" {...register('fatherName')} />
              <FormErrorMessage>{errors.fatherName?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('motherName')}>
              <FormLabel>Nome da mãe</FormLabel>
              <Input placeholder="Digite o nome da mãe" {...register('motherName')} />
              <FormErrorMessage>{errors.motherName?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Box position="relative" padding="6">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Diversidade
          </AbsoluteCenter>
        </Box>

        <Grid templateColumns="250px 1fr 1fr" gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('race')}>
              <FormLabel>Etnia</FormLabel>
              <Select defaultValue={''} {...register('race')}>
                <option value={''} label="Selecione a etnia" disabled>
                  Selecione a etnia
                </option>
                {races.map((race) => (
                  <option key={race} label={race}>
                    {race}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.race?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('gender')}>
              <FormLabel>Identidade de gênero</FormLabel>
              <Select defaultValue={''} {...register('gender')}>
                <option value={''} label="Selecione a identidade de gênero" disabled>
                  Selecione a identidade de gênero
                </option>
                {genders.map((gender) => (
                  <option key={gender} label={gender}>
                    {gender}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('sexuality')}>
              <FormLabel>Sexualidade</FormLabel>
              <Select defaultValue="" {...register('sexuality')}>
                <option value="" label="Selecione a sexualidade" disabled>
                  Selecione a sexualidade
                </option>
                {sexuality.map((sexuality) => (
                  <option key={sexuality} label={sexuality}>
                    {sexuality}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.sexuality?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>
        </Grid>

        <Box position="relative" padding="6">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Dados de identificação
          </AbsoluteCenter>
        </Box>

        <Grid templateColumns="repeat(3, 250px) 1fr 250px" gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('cpf')}>
              <FormLabel>CPF</FormLabel>
              <Input
                placeholder="Digite o CPF"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                {...register('cpf', {
                  onChange: handleChangeCpf,
                })}
              />
              <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('rg')}>
              <FormLabel>RG</FormLabel>
              <Input
                placeholder="Digite o RG"
                pattern="(^\d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$)"
                {...register('rg', {
                  onChange: handleChangeRg,
                })}
              />
              <FormErrorMessage>{errors.rg?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('emission')}>
              <FormLabel>Data de emissão</FormLabel>
              <Input type="date" {...register('emission')} />
              <FormErrorMessage>{errors.emission?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('organ')}>
              <FormLabel>Orgão emissor</FormLabel>
              <Input placeholder="Diga qual foi o orgão emissor do RG" {...register('organ')} />
              <FormErrorMessage>{errors.organ?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Renda</FormLabel>
              <InputGroup>
                <InputLeftAddon>R$</InputLeftAddon>
                <NumberInput defaultValue={0} precision={2} min={0} max={1000000000.0}>
                  <NumberInputField placeholder="Diga sua renda" />
                </NumberInput>
              </InputGroup>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns={'1fr 1fr 1fr'} gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl isInvalid={isInvalid('country')}>
              <FormLabel>País</FormLabel>
              <Select
                defaultValue="Brasil"
                {...register('country', {
                  onChange: handleChangeCountry,
                })}
              >
                {countries.map((country) => (
                  <option value={country} key={country} label={country}>
                    {country}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          {watch('country') === 'Brasil' && (
            <>
              <GridItem>
                <FormControl isInvalid={isInvalid('state')}>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    defaultValue=""
                    {...register('state', {
                      onChange: handleChangeState,
                    })}
                  >
                    <option value="" label="Selecione o estado" disabled>
                      Selecione o estado
                    </option>
                    {states.map((state) => (
                      <option key={state} label={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={isInvalid('city')}>
                  <FormLabel>Cidade</FormLabel>
                  <Select defaultValue="" {...register('city')}>
                    <option value="" label="Selecione a cidade" disabled>
                      Selecione a cidade
                    </option>
                    {cities.map((city) => (
                      <option key={city} label={city}>
                        {city}
                      </option>
                    ))}
                  </Select>
                  <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </>
          )}
        </Grid>

        <FormControl isInvalid={isInvalid('ctps')} marginTop={'1rem'}>
          <FormLabel>CTPS</FormLabel>
          <Input placeholder="Diga qual CTPS" {...register('ctps')} />
          <FormErrorMessage>{errors.ctps?.message}</FormErrorMessage>
        </FormControl>

        <Box position="relative" padding="6">
          <Divider />
          <AbsoluteCenter bg="white" px="4">
            Informações adicionais
          </AbsoluteCenter>
        </Box>

        <Grid
          templateColumns={'3fr 2fr'}
          templateRows={'repeat(3, 1fr)'}
          gap={'1rem'}
          rowGap={'1rem'}
          marginTop={'1rem'}
        >
          <GridItem>
            <FormControl>
              <FormLabel>Objetivos</FormLabel>
              <Textarea placeholder="Digite os objetivos" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Tempo em situação de rua</FormLabel>
              <Textarea placeholder="Quanto tempo em situação de rua?" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormLabel>Situação de rua</FormLabel>
            <Textarea placeholder="Diga o motivo por estar em situação de rua" />
          </GridItem>

          <GridItem>
            <FormLabel>Necessidade especiais</FormLabel>
            <Textarea placeholder="Diga o motivo por estar em situação de rua" />
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Expulsão</FormLabel>
              <Textarea placeholder="Diga o motivo da expulsão" />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Observações</FormLabel>
              <Textarea placeholder="Diga qual observação deve ser feita" />
            </FormControl>
          </GridItem>
        </Grid>

        <FormControl>
          <FormLabel>Desaparecido</FormLabel>
          <Input placeholder="Diga se está desaparecido" />
        </FormControl>

        <Center paddingTop={'50px'}>
          <Button type="submit" width={'40%'} colorScheme="blue">
            Enviar
          </Button>
        </Center>
      </form>
    </Flex>
  )
}
