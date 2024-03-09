import React from 'react'
import vine from '@vinejs/vine'
import Checkbox from '../../components/form/Checkbox.jsx'
import Input from '../../components/form/Input.jsx'
import vineResolver from '../../utils/vine.resolver.js'
import InputGroup from '../../components/form/InputGroup.jsx'
import Select from '../../components/form/Select.jsx'
import { useForm } from 'react-hook-form'
import { useDisclosure } from '@chakra-ui/react'

import './styles/Form.scss'
import { Textarea, Text } from '@chakra-ui/react'
import SendingModal from './components/sendingModal.jsx'

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    getValues,
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
      'Sem nenhuma escolaridade',
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
        <InputGroup>
          <Input
            label="Nome Social/Apelido"
            placeholder="Digite o seu nome social"
            {...register('socialName')}
          />

          <Input label="Data de nascimento" type="date" {...register('birthDate')} />

          <Select
            label="Etnia"
            defaultValue="Qual a sua etnia?"
            options={races.map((race) => ({
              key: race.toLowerCase(),
              label: race,
              value: race,
            }))}
            {...register('race')}
          />

          <Select
            label="Identidade de gênero"
            defaultValue="Qual a sua identidade de gênero?"
            options={genders.map((gender) => ({
              key: gender.toLowerCase(),
              label: gender,
              value: gender,
            }))}
            {...register('gender')}
          />

          <Input
            label="Nome do pai"
            placeholder="Digite o nome do pai do assistido"
            {...register('fatherName')}
          />

          <Input
            label="Nome do pai"
            placeholder="Digite o nome do pai do assistido"
            {...register('fatherName')}
          />

          <Input
            label="Nome da mãe"
            placeholder="Digite o nome da mãe do assistido"
            {...register('motherName')}
          />

          <Select
            label="País"
            defaultValue="Qual país você nasceu?"
            options={countries.map((country) => ({
              key: country.toLowerCase(),
              label: country,
              value: country,
            }))}
            {...register('country', {
              onChange: handleChangeCountry,
            })}
          />

          {getValues('country') === 'Brasil' && (
            <>
              <Select
                label="Estado"
                defaultValue="Qual estado você nasceu?"
                options={states.map((state) => ({
                  key: state.toLowerCase(),
                  label: state,
                  value: state,
                }))}
                {...register('state', {
                  onChange: handleChangeState,
                })}
              />

              <Select
                label="Cidade"
                defaultValue="Qual cidade você nasceu?"
                options={cities.map((city) => ({
                  key: city.toLowerCase(),
                  label: city,
                  value: city,
                }))}
                {...register('city')}
              />
            </>
          )}

          <Input
            label="CPF"
            placeholder="Digite o CPF"
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            {...register('cpf', {
              onChange: handleChangeCpf,
            })}
          />

          <Input label="RG" placeholder="Digite o RG" {...register('rg')} />

          <Input label="Data de emissão" type="date" {...register('emission')} />

          <Input
            label="Orgão emissor"
            placeholder="Diga qual foi o orgão emissor do RG"
            {...register('organ')}
          />

          <Input label="CTPS" placeholder="Diga qual CTPS" {...register('ctps')} />

          <Select
            label="Escolaridade"
            defaultValue="Qual a escolaridade do assistido?"
            options={degrees.map((degree) => ({
              key: degree.toLowerCase(),
              label: degree,
              value: degree,
            }))}
            {...register('schooling')}
          />

          <Input label="Objetivos:" placeholder="Digite os objetivos" />

          <Input
            label="Situação de rua:"
            placeholder="Diga o motivo por estar em situação de rua"
          />

          <Input label="Tempo em situação de rua:" placeholder="Quanto tempo em situação de rua?" />

          <Input label="Renda:" placeholder="Diga sua renda" />

          <Input label="Necessidade especiais:" placeholder="Diga qual necessidade especial" />

          <Input label="Expulsão:" placeholder="Diga o motivo da expulsão" />

          <Input label="Desaparecido" placeholder="Diga se está desaparecido" />

          <Input label="Observações" placeholder="Diga qual observação deve ser feita" />
        </InputGroup>

        <div className='send'>
          <button className="btn btn-secondary btn-sm" id="enviar" onClick={onOpen}>
            Enviar
          </button>

          <SendingModal isOpen={isOpen} onClose={onClose} />
        </div>
      </form>
    </div>
  )
}
