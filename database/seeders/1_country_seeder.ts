import Country from '#models/country'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Country.createMany([
            {
                name: 'Não informado',
                default: true,
            },
            {
                name: 'Afeganistão',
            },
            {
                name: 'África do Sul',
            },
            {
                name: 'Albânia',
            },
            {
                name: 'Alemanha',
            },
            {
                name: 'Andorra',
            },
            {
                name: 'Angola',
            },
            {
                name: 'Antígua e Barbuda',
            },
            {
                name: 'Arábia Saudita',
            },
            {
                name: 'Argélia',
            },
            {
                name: 'Argentina',
            },
            {
                name: 'Armênia',
            },
            {
                name: 'Austrália',
            },
            {
                name: 'Áustria',
            },
            {
                name: 'Azerbaijão',
            },
            {
                name: 'Bahamas',
            },
            {
                name: 'Bangladesh',
            },
            {
                name: 'Barbados',
            },
            {
                name: 'Bahrein',
            },
            {
                name: 'Belarus',
            },
            {
                name: 'Bélgica',
            },
            {
                name: 'Belize',
            },
            {
                name: 'Benin',
            },
            {
                name: 'Butão',
            },
            {
                name: 'Bolívia',
            },
            {
                name: 'Bósnia e Herzegovina',
            },
            {
                name: 'Botsuana',
            },
            {
                name: 'Brasil',
            },
            {
                name: 'Brunei',
            },
            {
                name: 'Bulgária',
            },
            {
                name: 'Burkina Faso',
            },
            {
                name: 'Burundi',
            },
            {
                name: 'Cabo Verde',
            },
            {
                name: 'Camboja',
            },
            {
                name: 'Camarões',
            },
            {
                name: 'Canadá',
            },
            {
                name: 'Catar',
            },
            {
                name: 'Cazaquistão',
            },
            {
                name: 'Chade',
            },
            {
                name: 'Chile',
            },
            {
                name: 'China',
            },
            {
                name: 'Chipre',
            },
            {
                name: 'Colômbia',
            },
            {
                name: 'Comores',
            },
            {
                name: 'Congo-Brazzaville',
            },
            {
                name: 'Congo-Kinshasa',
            },
            {
                name: 'Coreia do Norte',
            },
            {
                name: 'Coreia do Sul',
            },
            {
                name: 'Costa do Marfim',
            },
            {
                name: 'Costa Rica',
            },
            {
                name: 'Croácia',
            },
            {
                name: 'Cuba',
            },
            {
                name: 'Dinamarca',
            },
            {
                name: 'Dominica',
            },
            {
                name: 'Egito',
            },
            {
                name: 'El Salvador',
            },
            {
                name: 'Emirados Árabes Unidos',
            },
            {
                name: 'Equador',
            },
            {
                name: 'Eritreia',
            },
            {
                name: 'Eslováquia',
            },
            {
                name: 'Eslovênia',
            },
            {
                name: 'Espanha',
            },
            {
                name: 'Estados Unidos',
            },
            {
                name: 'Estônia',
            },
            {
                name: 'Eswatini',
            },
            {
                name: 'Etiópia',
            },
            {
                name: 'Fiji',
            },
            {
                name: 'Filipinas',
            },
            {
                name: 'Finlândia',
            },
            {
                name: 'França',
            },
            {
                name: 'Gabão',
            },
            {
                name: 'Gâmbia',
            },
            {
                name: 'Gana',
            },
            {
                name: 'Geórgia',
            },
            {
                name: 'Granada',
            },
            {
                name: 'Grécia',
            },
            {
                name: 'Guatemala',
            },
            {
                name: 'Guiana',
            },
            {
                name: 'Guiné',
            },
            {
                name: 'Guiné-Bissau',
            },
            {
                name: 'Guiné Equatorial',
            },
            {
                name: 'Haiti',
            },
            {
                name: 'Holanda',
            },
            {
                name: 'Honduras',
            },
            {
                name: 'Hungria',
            },
            {
                name: 'Iémen',
            },
            {
                name: 'Ilhas Marshall',
            },
            {
                name: 'Ilhas Salomão',
            },
            {
                name: 'Índia',
            },
            {
                name: 'Indonésia',
            },
            {
                name: 'Irã',
            },
            {
                name: 'Iraque',
            },
            {
                name: 'Irlanda',
            },
            {
                name: 'Islândia',
            },
            {
                name: 'Israel',
            },
            {
                name: 'Itália',
            },
            {
                name: 'Jamaica',
            },
            {
                name: 'Japão',
            },
            {
                name: 'Jordânia',
            },
            {
                name: 'Kiribati',
            },
            {
                name: 'Kuwait',
            },
            {
                name: 'Laos',
            },
            {
                name: 'Lesoto',
            },
            {
                name: 'Letônia',
            },
            {
                name: 'Líbano',
            },
            {
                name: 'Libéria',
            },
            {
                name: 'Líbia',
            },
            {
                name: 'Liechtenstein',
            },
            {
                name: 'Lituânia',
            },
            {
                name: 'Luxemburgo',
            },
            {
                name: 'Macedônia do Norte',
            },
            {
                name: 'Madagascar',
            },
            {
                name: 'Malásia',
            },
            {
                name: 'Malawi',
            },
            {
                name: 'Maldivas',
            },
            {
                name: 'Mali',
            },
            {
                name: 'Malta',
            },
            {
                name: 'Marrocos',
            },
            {
                name: 'Maurícia',
            },
            {
                name: 'Mauritânia',
            },
            {
                name: 'México',
            },
            {
                name: 'Micronésia',
            },
            {
                name: 'Moçambique',
            },
            {
                name: 'Moldávia',
            },
            {
                name: 'Mônaco',
            },
            {
                name: 'Mongólia',
            },
            {
                name: 'Montenegro',
            },
            {
                name: 'Myanmar',
            },
            {
                name: 'Namíbia',
            },
            {
                name: 'Nauru',
            },
            {
                name: 'Nepal',
            },
            {
                name: 'Nicarágua',
            },
            {
                name: 'Níger',
            },
            {
                name: 'Nigéria',
            },
            {
                name: 'Noruega',
            },
            {
                name: 'Nova Zelândia',
            },
            {
                name: 'Omã',
            },
            {
                name: 'Palau',
            },
            {
                name: 'Panamá',
            },
            {
                name: 'Papua-Nova Guiné',
            },
            {
                name: 'Paquistão',
            },
            {
                name: 'Paraguai',
            },
            {
                name: 'Peru',
            },
            {
                name: 'Polônia',
            },
            {
                name: 'Portugal',
            },
            {
                name: 'Quênia',
            },
            {
                name: 'Quirguistão',
            },
            {
                name: 'Reino Unido',
            },
            {
                name: 'República Centro-Africana',
            },
            {
                name: 'República Dominicana',
            },
            {
                name: 'República Tcheca',
            },
            {
                name: 'Romênia',
            },
            {
                name: 'Ruanda',
            },
            {
                name: 'Rússia',
            },
            {
                name: "Samoa"
            },
            {
                name: "San Marino"
            },
            {
                name: "Santa Lúcia"
            },
            {
                name: "São Cristóvão e Neves"
            },
            {
                name: "São Tomé e Príncipe"
            },
            {
                name: "São Vicente e Granadinas"
            },
            {
                name: "Seicheles"
            },
            {
                name: "Senegal"
            },
            {
                name: "Serra Leoa"
            },
            {
                name: "Sérvia"
            },
            {
                name: "Singapura"
            },
            {
                name: "Síria"
            },
            {
                name: "Somália"
            },
            {
                name: "Sri Lanka"
            },
            {
                name: "Suazilândia"
            },
            {
                name: "Sudão"
            },
            {
                name: "Sudão do Sul"
            },
            {
                name: "Suécia"
            },
            {
                name: "Suíça"
            },
            {
                name: "Suriname"
            },
            {
                name: "Tailândia"
            },
            {
                name: "Tajiquistão"
            },
            {
                name: "Tanzânia"
            },
            {
                name: "Timor-Leste"
            },
            {
                name: "Togo"
            },
            {
                name: "Tonga"
            },
            {
                name: "Trinidad e Tobago"
            },
            {
                name: "Tunísia"
            },
            {
                name: "Turcomenistão"
            },
            {
                name: "Turquia"
            },
            {
                name: "Tuvalu"
            },
            {
                name: "Ucrânia"
            },
            {
                name: "Uganda"
            },
            {
                name: "Uruguai"
            },
            {
                name: "Uzbequistão"
            },
            {
                name: "Vanuatu"
            },
            {
                name: "Vaticano"
            },
            {
                name: "Venezuela"
            },
            {
                name: "Vietnã"
            },
            {
                name: "Zâmbia"
            },
            {
                name: "Zimbábue"
            },
        ])
    }
}
