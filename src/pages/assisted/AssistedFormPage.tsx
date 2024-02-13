import React from 'react'
import vine from '@vinejs/vine'
import NavBar from '../../components/navbar/NavBar.jsx'
import vineResolver from '../../utils/vine.resolver.js'
import { useForm } from 'react-hook-form'

import './styles/Form.scss'

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
}

export default function AssistedFormPage() {
  const {
    getValues,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    resolver: vineResolver(formSchema),
  })

  const [countries, setCountries] = React.useState([])
  const [states, setStates] = React.useState([])
  const [cities, setCities] = React.useState([])

  const races = ['Branco', 'Preto/Negro', 'Amarelo', 'Vermelho/Índigena', 'Outro']
  const genders = ['Homem Cisgênero', 'Mulher Cisgênero']
  const degrees = [
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
  ]

  React.useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/paises')
      .then((response) => response.json())
      .then((response) => setCountries(response.map((pais: Record<string, any>) => pais.nome)))
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
        .replace(/(-\d{2})\d+?$/, '$1')
    )
  }

  async function onSubmit() {
    console.log(errors, isValid)
    console.log(getValues())
  }

  return (
    <>
      <NavBar />
      <div className="pagina">
        <div className="form">
          <button onClick={handleSubmit(onSubmit)}>ASDASDA</button>
          <form action="#">
            <div className="form-header">
              <div className="title">
                <h1>Cadastro do Assistido</h1>
              </div>
            </div>
            <div className="compartilhaDados">
              <h1>O assistido concorda em compartilhar seus dados com a organização ?</h1>
            </div>
            <div className="booleanInput">
              <button
                id="butao1"
                className="btn btn-outline btn-secondary"
                // onClick={setState({ shareData: true })}
              >
                Sim
              </button>
              <button
                className="btn btn-outline btn-secondary"
                // onClick={setState({ shareData: true })}
              >
                Não
              </button>
            </div>
            <div className="input-group">
              <div className="input-box">
                <label>Nome Completo</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o seu nome"
                  {...register('fullName', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
              <div className="input-box">
                <label>Nome Social/Apelido</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o seu nome social"
                  {...register('socialName', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
              <div className="input-box">
                <label>Data de nascimento</label>
                <input
                  type="date"
                  placeholder="Digite o seu nome social"
                  className="input input-bordered input-md w-full max-w-xs"
                  {...register('birthDate', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
              <div className="input-box">
                <label>Etnia</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  {...register('race', {
                    required: 'Este campo é obrigatório',
                  })}
                >
                  <option key={''}>Qual a sua etnia?</option>
                  {races.map((race, index) => (
                    <option key={index}>{race}</option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <label>Identidade de gênero</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  {...register('gender', {
                    required: 'Este campo é obrigatório',
                  })}
                >
                  <option key="">Qual a sua identidade de gênero?</option>
                  {genders.map((gender, index) => (
                    <option key={index}>{gender}</option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <label>Nome do pai</label>
                <input
                  type="text"
                  placeholder="Digite o nome do pai do assistido"
                  className="input input-bordered input-md w-full max-w-xs"
                  {...register('fatherName', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
              <div className="input-box">
                <label>Nome da mãe</label>
                <input
                  type="text"
                  placeholder="Digite o nome da mãe do assistido"
                  className="input input-bordered input-md w-full max-w-xs"
                  {...register('motherName', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>
              <div className="input-box">
                <label>País</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  {...register('country', {
                    required: 'Este campo é obrigatório',
                    onChange: handleChangeCountry,
                  })}
                >
                  <option key="">Qual país você nasceu?</option>
                  {countries.map((country, index) => (
                    <option key={index}>{country}</option>
                  ))}
                </select>
              </div>
              {getValues('country') === 'Brasil' && (
                <>
                  <div className="input-box">
                    <label>Estado</label>
                    <select
                      className="select select-secondary w-full max-w-xs"
                      {...register('state', {
                        required: 'Este campo é obrigatório',
                        onChange: handleChangeState,
                      })}
                    >
                      <option key="">Qual estado você nasceu?</option>
                      {states.map((state, index) => (
                        <option key={index}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-box">
                    <label>Cidade</label>
                    <select
                      className="select select-secondary w-full max-w-xs"
                      {...register('city', {
                        required: 'Este campo é obrigatório',
                      })}
                    >
                      <option key="">Qual cidade você nasceu?</option>
                      {cities.map((city, index) => (
                        <option key={index}>{city}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="input-box">
                <label>CPF</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o CPF"
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                  {...register('cpf', {
                    required: 'Este campo é obrigatório',
                    onChange: handleChangeCpf,
                  })}
                />
              </div>

              <div className="input-box">
                <label>RG</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o RG"
                  {...register('rg', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>

              <div className="input-box">
                <label>Data de emissão</label>
                <input
                  type="date"
                  placeholder="Digite a data de emissão"
                  className="input input-bordered input-md w-full max-w-xs"
                  {...register('emission', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>

              <div className="input-box">
                <label>Orgão emissor</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Diga qual foi o orgão emissor do RG"
                  {...register('organ', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>

              <div className="input-box">
                <label>CTPS</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Diga qual CTPS"
                  {...register('ctps', {
                    required: 'Este campo é obrigatório',
                  })}
                />
              </div>

              <div className="input-box">
                <label>Escolaridade</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  {...register('schooling', {
                    required: 'Este campo é obrigatório',
                  })}
                >
                  <option key="">Qual a escolaridade do assistido?</option>
                  {degrees.map((degree, index) => (
                    <option key={index}>{degree}</option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <label>Objetivos:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Motivos para estar em situação de rua:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Tempo em situação de rua:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Lugar que pernoita:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Renda:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Necessidade especiais:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Expulsão:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Desaparecido</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="input-box">
                <label>Observações</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
