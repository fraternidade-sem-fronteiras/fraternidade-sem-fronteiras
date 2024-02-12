import WrongPasswordException from '#exceptions/wrong_password_exception'
import Volunteer from '#models/volunteer'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import TokenService from '#services/token_service'

@inject()
export default class VolunteerService {
  constructor(readonly tokenService: TokenService) {}

  /**
   *
   * Criar um novo voluntário no banco de dados
   *
   * Caso o voluntário já exista, retorna o que já está registrado dentro do banco de dados
   *
   * @param name - Nome do voluntário
   * @param email - Email do voluntário
   * @param password - Senha do voluntário (opcional)
   * @param levelId - ID do nível do voluntário
   * @return Volunteer
   */

  async createVolunteer(
    name: string,
    email: string,
    password: string,
    levelId: number
  ): Promise<Volunteer> {
    let volunteer = await Volunteer.findBy('email', email)

    if (volunteer) {
      return volunteer
    }

    volunteer = new Volunteer()

    volunteer.name = name
    volunteer.email = email
    volunteer.password = password
    volunteer.levelId = levelId

    await volunteer.save()

    return volunteer
  }

  async createSession(
    email: string,
    password: string
  ): Promise<{ token: string; volunteer: Volunteer }> {
    const volunteer = await Volunteer.findBy('email', email)

    if (!volunteer) {
      throw new Error('Voluntário não encontrado')
    }

    const match = await hash.verify(volunteer.password, password)

    if (!match) throw new WrongPasswordException()

    const token = await this.tokenService.generate(volunteer)

    return { token, volunteer }
  }

  /**
   *
   * Listar todos os voluntários do banco de dados, usando paginação
   *
   * @param page - Página atual
   * @param limit - Limite de itens por página
   * @param orderBy - Campo para ordenar
   * @param order - Ordem de ordenação (asc ou desc)
   * @return Volunteer[]
   *
   */

  async getVolunteers(
    page: number,
    limit: number,
    orderBy: string,
    order: 'asc' | 'desc'
  ): Promise<Volunteer[]> {
    const volunteers = await Volunteer.query()
      .select(['id', 'name', 'email', 'levelId'])
      .orderBy(orderBy, order)
      .paginate(page, limit)
    return volunteers.all()
  }

  /**
   * Retorna um voluntário pelo ID ou null, caso não exista
   *
   * @param id - ID do voluntário
   * @return Volunteer | null
   *
   */

  async getVolunteerById(id: number): Promise<Volunteer | null> {
    const volunteer = await Volunteer.query()
      .select(['id', 'name', 'email', 'levelId'])
      .where({ id })
      .first()

    return volunteer
  }

  /**
   *
   * Retorn um voluntário pelo email ou null, caso não exista
   *
   * @param email - Email do voluntário
   * @return Volunteer | null
   */

  async getVolunteerByEmail(email: string): Promise<Volunteer | null> {
    const volunteer = await Volunteer.query()
      .select(['id', 'name', 'email', 'levelId'])
      .where({ email })
      .first()

    return volunteer
  }

  /**
   * Prototipo de função para verificar se uma propriedade existe dentro do model
   *
   * @param volunteerId - ID do voluntário
   * @param permission - Permissão a ser verificada
   * @return boolean
   */

  async hasPermission(volunteer: number | Volunteer, permission: string): Promise<boolean> {
    if (typeof volunteer === 'number') {
      const user = await Volunteer.query()
        .select(['id', 'name', 'email', 'levelId'])
        .where({ id: volunteer })
        .whereHas('level', (query) => {
          query.whereHas('levelsPermission', (query) => {
            query.where('name', permission)
          })
        })
        .first()

      return !!user
    } else {
      return volunteer.level.levelsPermission.some((p) => p.permission.name === permission)
    }
  }

  /**
   * Atualiza as informações de um voluntário
   *
   * @param id - ID do voluntário
   * @param payload
   * @returns
   */

  async updateVolunteer(id: number, payload: any): Promise<any> {
    const volunteer = await Volunteer.findBy('id', id)

    if (!volunteer) {
      throw new Error('Voluntário não encontrado')
    }

    const oldVolunteer = {
      name: volunteer?.name,
      levelId: volunteer?.levelId,
    }

    await volunteer
      .merge({
        name: payload.name,
        password: payload.password,
        levelId: payload.levelId,
      })
      .save()

    return {
      id: volunteer.id,
      updated: [
        {
          fieldName: 'name',
          oldValue: oldVolunteer.name,
          newValue: volunteer.name,
        },
        {
          fieldName: 'levelId',
          oldValue: oldVolunteer.levelId,
          newValue: volunteer.levelId,
        },
      ],
    }
  }

  /**
   *
   * Verifica se a propriedade existe na classe Volunteer
   *
   * @param property
   * @returns
   */

  hasProperty(property: string): boolean {
    return Volunteer.$getColumn(property) !== undefined
  }

  /**
   * Deleta um voluntário do banco de dados caso ele exista
   *
   * @param id - ID do voluntário
   */

  async deleteVolunteer(id: number) {
    let volunteer = await Volunteer.findBy('id', id)

    if (!volunteer) {
      throw new Error('Voluntário não encontrado')
    }

    await volunteer.delete()
  }
}
