import React from 'react'
import vine from '@vinejs/vine'
import Checkbox from '../../components/form/Checkbox.jsx'
import vineResolver from '../../utils/vine.resolver.js'
import { useForm } from 'react-hook-form'

import './styles/Form.scss'
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Textarea,
} from '@chakra-ui/react'

const formSchema = vine.object({
  fullName: vine.string().minLength(3).maxLength(64),
  socialName: vine.string().minLength(3).maxLength(32),

  motherName: vine.string().minLength(3).maxLength(64),
  fatherName: vine.string().minLength(3).maxLength(64),

  birthDate: vine.date(),

  country: vine.string().minLength(1),
  state: vine.string().minLength(1),
  city: vine.string().minLength(1),

  race: vine.string(),
  gender: vine.string(),

  cpf: vine.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
  rg: vine.string().minLength(9).maxLength(9),
  emission: vine.date(),
  organ: vine.string().minLength(3).maxLength(32),

  ctps: vine.string().minLength(7).maxLength(7),

  schooling: vine.string().minLength(3).maxLength(32),

  shareData: vine.boolean(),
})

interface FormProps {
  fullName: string
  socialName: string

  motherName: string
  fatherName: string

  birthDate: Date

  country: string
  state: string
  city: string

  race: string
  gender: string

  cpf: string
  rg: string
  emission: Date
  organ: string

  ctps: string
  schooling: string

  shareData: boolean
}

export default function AssistedFormPage() {
  const {
    getValues,
    watch,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    resolver: vineResolver(formSchema),
  })

  const [countries, setCountries] = React.useState<string[]>([])
  const [states, setStates] = React.useState<string[]>([])
  const [cities, setCities] = React.useState<string[]>([])

  const [races, setRaces] = React.useState<string[]>([])
  const [genders, setGenders] = React.useState<string[]>([])
  const [degrees, setDegrees] = React.useState<string[]>([])

  React.useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises')
      .then((response) => response.json())
      .then((response) => setCountries(response.map((pais: Record<string, any>) => pais.nome)))

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
  }, [])

  const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== 'Brasil') return

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => response.json())
      .then((data) => {
        setStates(data.map((estado: Record<string, any>) => estado.sigla))
        setCities([])
        setValue('state', '')
        setValue('city', '')
      })

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

  async function onValidSubmit() {
    console.log('valid', errors, isValid, getValues())
  }

  return (
    <div className="flex flex-col justify-center items-center p-12 bg-white">
      <form onSubmit={handleSubmit(onValidSubmit)} noValidate>
        <h1 className="form-header">Cadastro do Assistido</h1>
        <div className="flex justify-center items-center flex-col py-5">
          <h1>O assistido concorda em compartilhar seus dados com a organização ?</h1>
          <Checkbox {...register('shareData')} />
        </div>

        <Grid templateColumns="2fr repeat(3, 1fr)" gap={'1rem'}>
          <GridItem>
            <FormControl>
              <FormLabel>Nome completo</FormLabel>
              <Input placeholder="Digite o nome completo" {...register('fullName')} />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Escolaridade</FormLabel>
              <Select defaultValue="Sem nenhuma escolaridade" {...register('schooling')}>
                <option key={'Sem nenhuma escolaridade'} disabled>
                  Sem nenhuma escolaridade
                </option>
                {degrees.map((degree) => (
                  <option key={degree}>{degree}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Nome social</FormLabel>
              <Input placeholder="Digite o seu nome social" {...register('socialName')} />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Data de nascimento</FormLabel>
              <Input type="date" {...register('birthDate')} />
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(2, 1fr)" gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl>
              <FormLabel>Nome do pai</FormLabel>
              <Input placeholder="Digite o nome do pai do assistido" {...register('fatherName')} />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Nome da mãe</FormLabel>
              <Input placeholder="Digite o nome da mãe do assistido" {...register('motherName')} />
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="250px 1fr" gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl>
              <FormLabel>Etnia</FormLabel>
              <Select defaultValue=" " {...register('race')}>
                <option key=" " label="Selecione a etnia" disabled>
                  Selecione a etnia
                </option>
                {races.map((race) => (
                  <option key={race} label={race}>
                    {race}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Identidade de gênero</FormLabel>
              <Select defaultValue="" {...register('gender')}>
                <option key="" label="Selecione a identidade de gênero" disabled>
                  Selecione a identidade de gênero
                </option>
                {genders.map((gender) => (
                  <option key={gender} label={gender}>
                    {gender}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>

        <Grid templateColumns="repeat(3, 250px) 1fr 250px" gap={'1rem'} marginTop={'1rem'}>
          <GridItem>
            <FormControl>
              <FormLabel>CPF</FormLabel>
              <Input
                placeholder="Digite o CPF"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                {...register('cpf', {
                  onChange: handleChangeCpf,
                })}
              />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>RG</FormLabel>
              <Input placeholder="Digite o RG" {...register('rg')} />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Data de emissão</FormLabel>
              <Input type="date" {...register('emission')} />
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl>
              <FormLabel>Orgão emissor</FormLabel>
              <Input placeholder="Diga qual foi o orgão emissor do RG" {...register('organ')} />
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
          <FormControl>
            <FormLabel>País</FormLabel>
            <Select
              defaultValue="Brasil"
              {...register('country', {
                onChange: handleChangeCountry,
              })}
            >
              {countries.map((country) => (
                <option key={country} label={country}>
                  {country}
                </option>
              ))}
            </Select>
          </FormControl>

          {watch('country') === 'Brasil' && (
            <>
              <FormControl>
                <FormLabel>Estado</FormLabel>
                <Select
                  defaultValue="Qual estado você nasceu?"
                  {...register('state', {
                    onChange: handleChangeState,
                  })}
                >
                  {states.map((state) => (
                    <option key={state} label={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Cidade</FormLabel>
                <Select defaultValue="Qual cidade você nasceu?" {...register('city')}>
                  {cities.map((city) => (
                    <option key={city} label={city}>
                      {city}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Grid>

        <FormControl>
          <FormLabel>CTPS</FormLabel>
          <Input placeholder="Diga qual CTPS" {...register('ctps')} />
        </FormControl>

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

        <Button type="submit" width={'100%'} colorScheme="#9D2D88">
          Enviar
        </Button>
      </form>
    </div>
  )
}
