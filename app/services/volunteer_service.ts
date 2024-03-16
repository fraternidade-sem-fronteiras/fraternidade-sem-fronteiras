import WrongPasswordException from '#exceptions/wrong_password_exception'
import Volunteer from '#models/volunteer'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import TokenService from '#services/token_service'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import ConflictException from '#exceptions/conflict_exception'

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
   * @param role - ID do nível do voluntário
   * @return Volunteer
   */

  async createVolunteer(name: string, email: string, roleId: number): Promise<Volunteer> {
    let volunteer = await Volunteer.findBy('email', email)

    if (volunteer) throw new ConflictException('O voluntário com email ' + email + ' já existe')

    volunteer = new Volunteer()

    volunteer.name = name
    volunteer.email = email
    volunteer.password = email
    volunteer.roleId = roleId

    await volunteer.save()

    return volunteer
  }

  async createSession(
    email: string,
    password: string
  ): Promise<{ token: string; volunteer: Volunteer; registered?: boolean }> {
    const volunteer = await Volunteer.findBy('email', email)

    if (!volunteer)
      throw new EntityNotFoundException('The volunteer with email ' + email + ' was not found')

    let registered: true | undefined = undefined

    if (volunteer.registered) {
      const match = await hash.verify(volunteer.password, password)
      if (!match) throw new WrongPasswordException()
    } else {
      await volunteer
        .merge({
          password,
          registered: true,
        })
        .save()
      registered = true
    }

    const token = await this.tokenService.generate(volunteer)

    return { token, volunteer, registered }
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
      .select(['id', 'name', 'email', 'roleId', 'createdAt'])
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
      .select(['id', 'name', 'email', 'roleId', 'createdAt', 'registered'])
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
      .select(['id', 'name', 'email', 'role'])
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
        .select(['id', 'name', 'email', 'role'])
        .where({ id: volunteer })
        .whereHas('role', (query) => {
          query.whereHas('levelsPermission', (query) => {
            query.where('name', permission)
          })
        })
        .first()

      return !!user
    } else {
      return volunteer.role.levelsPermission.some((p) => p.permission.name === permission)
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
      role: volunteer?.role,
    }

    await volunteer
      .merge({
        name: payload.name,
        password: payload.password,
        roleId: payload.role,
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
          fieldName: 'role',
          oldValue: oldVolunteer.role,
          newValue: volunteer.role,
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
