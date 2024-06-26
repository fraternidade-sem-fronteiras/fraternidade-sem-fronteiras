import React, { useEffect } from 'react'
import vine from '@vinejs/vine'
import vineResolver from '@/utils/vine.resolver'
import axios from '@/utils/axios.instance'
import useToast from '@/hooks/toast.hook'
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
import { Schooling } from '@/@types/schooling'
import { Gender } from '@/@types/gender'

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

  ethnicy: vine.string().minLength(1),
  genderId: vine.string(),

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

  schoolingId: vine.string(),

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
  const [genders, setGenders] = React.useState<Gender[]>([])
  const [sexuality, setSexuality] = React.useState<string[]>([])
  const [schoolings, setSchoolings] = React.useState<Schooling[]>([])

  useEffect(() => {
    Promise.all([
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/paises'),
      axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados'),
    ]).then(([countries, states]) => {
      setCountries(countries.data.map((pais: Record<string, any>) => pais.nome))
      setStates(states.data.map((estado: Record<string, any>) => estado.sigla))
    })

    Promise.all([axios.get('schoolings'), axios.get('genders')]).then(([schoolings, genders]) => {
      setSchoolings(
        schoolings.data.map((schooling: Record<string, any>) => ({
          id: schooling.id,
          name: schooling.name,
        }))
      )
      setGenders(
        genders.data.map((gender: Record<string, any>) => ({
          id: gender.id,
          name: gender.name,
        }))
      )
    })

    setRaces(['Branco', 'Preto/Negro', 'Amarelo', 'Vermelho/Índigena', 'Outro'])

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
    console.log(errors[name])
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
            <FormControl isInvalid={isInvalid('schoolingId')}>
              <FormLabel>Escolaridade</FormLabel>
              <Select defaultValue={schoolings[0]?.id} {...register('schoolingId')}>
                {schoolings.map((schooling) => (
                  <option key={schooling.id} value={schooling.id}>
                    {schooling.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.schoolingId?.message}</FormErrorMessage>
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
            <FormControl isInvalid={isInvalid('ethnicy')}>
              <FormLabel>Etnia</FormLabel>
              <Select defaultValue={''} {...register('ethnicy')}>
                <option value={''} label="Selecione a etnia" disabled>
                  Selecione a etnia
                </option>
                {races.map((race) => (
                  <option key={race} label={race}>
                    {race}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.ethnicy?.message}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={isInvalid('genderId')}>
              <FormLabel>Identidade de gênero</FormLabel>
              <Select defaultValue={genders[0]?.id} {...register('genderId')}>
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.genderId?.message}</FormErrorMessage>
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

        <Grid
          templateColumns={watch('cpf') ? 'repeat(5, 1fr)' : 'repeat(5, 1fr)'}
          gap={'1rem'}
          marginTop={'1rem'}
        >
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

          {watch('cpf') && (
            <>
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
            </>
          )}

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
            <Textarea placeholder="Diga se há alguma necessidade especial" />
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
