import React from 'react'
import './styles/Form.scss'
import NavBar from '../../components/navbar/NavBar.jsx'

export default function AssistedFormPage() {
  //   const [countries, setCountries] = React.useState([])
  //   const [states, setStates] = React.useState([])
  //   const [cities, setCities] = React.useState([])

  //   const races = ['Branco', 'Preto/Negro', 'Amarelo', 'Vermelho/Índigena', 'Outro']
  //   const degrees = [
  //     'Sem nenhuma escolaridade',
  //     'Ensino Fundamental Incompleto',
  //     'Ensino Fundamental Completo',
  //     'Ensino Médio Incompleto',
  //     'Ensino Médio Completo',
  //     'Ensino Superior Completo',
  //     'Pós-Graduação',
  //     'Mestrado',
  //     'Doutorado',
  //     'Pós-Doutorado',
  //   ]

  // React.useEffect(() => {
    // api.get('https://servicodados.ibge.gov.br/api/v1/localidades/paises')
    //     .then(response => this.setState({ countries: response.data.map(pais => pais.nome) }));
    // api.get('genero')
    //     .then(response => this.setState({ genders: response.data.map(gender => gender.name) }));
    // api.get('estado_civil')
    //     .then(response => this.setState({ maritalStatuses: response.data.map(maritalStatus => maritalStatus.name) }));
  // }, [])

  // const handleShowModal = () => {
    // mostrar o modal
    // document.getElementById('leave_modal').showModal();
  // }

  // const handleSubmitLogout = () => {
    // acho uma boa ideia faz uma caixa de confirmação aqui
    // api
    //   .get('voluntario/logout')
    //   .then((response) => {
    //     window.location.href = '/?redirectTo=' + window.location.pathname
    //   })
    //   .catch((error) => console.log('Nao foi possivel se deslogar', error))
  // }

  const handleChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       states: data.map((estado) => estado.sigla),
    //       cities: [],

    //       country: event.target.value,
    //       state: '',
    //       city: '',
    //     })
    //   })

    event.preventDefault()
  }

  const handleChangeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // fetch(
    //   'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' +
    //     event.target.value +
    //     '/municipios'
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       cities: data.map((cidade) => cidade.nome),

    //       state: event.target.value,
    //       city: '',
    //     })
    //   })

    event.preventDefault()
  }

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // this.setState({
    //   city: event.target.value,
    // })

    event.preventDefault()
  }

  // const handleChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @link https://medium.com/reactbrasil/mascara-de-cpf-com-react-javascript-a07719345c93
    // Mascara de CPF com JavaScript

    // this.setState({
    //   cpf: event.target.value
    //     .replace(/\D/g, '')
    //     .replace(/(\d{3})(\d)/, '$1.$2')
    //     .replace(/(\d{3})(\d)/, '$1.$2')
    //     .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    //     .replace(/(-\d{2})\d+?$/, '$1'),
    // })

  //   event.preventDefault()
  // }

  return (
    <body>
      <div className="pagina">
        <NavBar />
        <div className="form">
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
              <div className="perguntas input-box">
                <label>Nome Completo</label>
                <input
                  type="text"
                  className="NomeCompleto input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o seu nome"
                  //   value={this.state.personalName}
                  //   onChange={(event) => this.setState({ personalName: event.target.value })}
                />
              </div>
              <div className="perguntas input-box">
                <label>Nome Social/Apelido</label>
                <input
                  type="text"
                  placeholder="Digite o seu nome social input input-bordered input-md w-full max-w-xs"
                  //   value={this.state.socialName}
                  //   onChange={(event) => this.setState({ socialName: event.target.value })}
                />
              </div>
              <div className="perguntas input-box">
                <label>Data de nascimento</label>
                <input
                  type="date"
                  placeholder="Digite o seu nome social"
                  className="input input-bordered input-md w-full max-w-xs"
                  //   onChange={(event) => this.setState({ birthDate: new Date(event.target.value) })}
                />
              </div>
              <div className="perguntas input-box">
                <label>Etnia</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  //   onChange={(event) => this.setState({ race: event.target.value })}
                >
                  <option key={-1} disabled selected>
                    Qual a sua etnia?
                  </option>
                  {/* {this.state.races.map((race, index) => (
                    <option key={index}>{race}</option>
                  ))} */}
                </select>
              </div>
              <div className="perguntas input-box">
                <label>Identidade de gênero</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  //   onChange={(event) => this.setState({ gender: event.target.value })}
                >
                  <option key={-1} disabled selected>
                    Qual a sua identidade de gênero?
                  </option>
                  {/* {this.state.genders.map((gender, index) => (
                    <option key={index}>{gender}</option>
                  ))} */}
                </select>
              </div>
              <div className="perguntas input-box">
                <label>Nome do pai</label>
                <input
                  type="text"
                  placeholder="Digite o nome do pai do assistido"
                  className="input input-bordered input-md w-full max-w-xs"
                  //   value={this.state.fatherName}
                  //   onChange={(event) => this.setState({ fatherName: event.target.value })}
                />
              </div>
              <div className="perguntas input-box">
                <label>Nome da mãe</label>
                <input
                  type="text"
                  placeholder="Digite o nome da mãe do assistido"
                  className="input input-bordered input-md w-full max-w-xs"
                  //   value={this.state.motherName}
                  //   onChange={(event) => this.setState({ motherName: event.target.value })}
                />
              </div>
              <div className="perguntas input-box">
                <label>País</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  onChange={handleChangeCountry}
                >
                  <option key={-1} disabled selected>
                    Qual país você nasceu?
                  </option>
                  {/* {this.state.countries.map((country, index) => (
                    <option key={index}>{country}</option>
                  ))} */}
                </select>
              </div>
              <div className="perguntas input-box">
                <label>Estado</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  onChange={handleChangeState}
                >
                  {/* {this.state.state === '' ? (
                    <option key={-1} disabled selected>
                      Qual estado você nasceu?
                    </option>
                  ) : (
                    <option key={-1} disabled>
                      Qual estado você nasceu?
                    </option>
                  )}
                  {this.state.states.map((state, index) =>
                    this.state.state === state ? (
                      <option key={index} selected>
                        {state}
                      </option>
                    ) : (
                      <option key={index}>{state}</option>
                    )
                  )} */}
                </select>
              </div>
              <div className="perguntas input-box">
                <label>Cidade</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  onChange={handleChangeCity}
                >
                  {/* {this.state.city === '' ? (
                    <option key={-1} disabled selected>
                      Qual cidade você nasceu?
                    </option>
                  ) : (
                    <option key={-1} disabled>
                      Qual cidade você nasceu?
                    </option>
                  )}
                  {this.state.cities.map((city, index) =>
                    this.state.city === city ? (
                      <option key={index} selected>
                        {city}
                      </option>
                    ) : (
                      <option key={index}>{city}</option>
                    )
                  )}
                  {this.state.cities.map((city, index) => (
                    <option key={index}>{city}</option>
                  ))} */}
                </select>
              </div>

              <div className="perguntas input-box">
                <label>CPF</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o CPF"
                  //   value={this.state.cpf}
                  //   onChange={(event) => this.handleChangeCpf(event)}
                  pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                />
              </div>

              <div className="perguntas input-box">
                <label>RG</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Digite o RG"
                  //   value={this.state.rg}
                  //   onChange={(event) => this.setState({ rg: event.target.value })}
                />
              </div>

              <div className="perguntas input-box">
                <label>Data de emissão</label>
                <input
                  type="date"
                  placeholder="Digite a data de emissão"
                  className="input input-bordered input-md w-full max-w-xs"
                  //   onChange={(event) => this.setState({ emission: new Date(event.target.value) })}
                />
              </div>

              <div className="perguntas input-box">
                <label>Orgão emissor</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Diga qual foi o orgão emissor do RG"
                  //   value={this.state.organ}
                  //   onChange={(event) => this.setState({ organ: event.target.value })}
                />
              </div>

              <div className="perguntas input-box">
                <label>CTPS</label>
                <input
                  type="text"
                  className="input input-bordered input-md w-full max-w-xs"
                  placeholder="Diga qual CTPS"
                  //   value={this.state.ctps}
                  //   onChange={(event) => this.setState({ ctps: event.target.value })}
                />
              </div>

              <div className="perguntas input-box">
                <label>Escolaridade</label>
                <select
                  className="select select-secondary w-full max-w-xs"
                  //   onChange={(event) => this.setState({ schooling: event.target.value })}
                >
                  <option disabled selected>
                    Qual a escolaridade do assistido?
                  </option>
                  {/* {this.state.degrees.map((degree, index) => (
                    <option key={index}>{degree}</option>
                  ))} */}
                </select>
              </div>
              <div className="perguntas input-box">
                <label>Objetivos:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Certidão de nascimento</label>
                <div>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Motivos para estar em situação de rua:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Tempo em situação de rua:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Lugar que pernoita:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Renda:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Necessidade especiais:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Expulsão:</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
                <label>Desaparecido</label>
                <div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered input-lg w-full max-w-xs"
                  />
                </div>
              </div>
              <div className="perguntas input-box">
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
    </body>
  )
}
