import WrongPasswordException from '#exceptions/wrong_password_exception'
import Volunteer, { VolunteerDto } from '#models/volunteer'
import { inject } from '@adonisjs/core'
import hash from '@adonisjs/core/services/hash'
import TokenService from '#services/token_service'
import EntityNotFoundException from '#exceptions/entity_not_found_exception'
import ConflictException from '#exceptions/conflict_exception'
import Role from '#models/role'
import { PageResult } from '../utils/pageable.js'

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

  async createVolunteer(name: string, email: string, roles: string[]): Promise<Volunteer> {
    let volunteer = await Volunteer.findBy('email', email)

    if (volunteer) throw new ConflictException('O voluntário com email ' + email + ' já existe')

    volunteer = await Volunteer.create({
      name,
      email,
      password: email,
    })

    const rolesExist = await Role.query().whereIn('id', roles)

    if (rolesExist.length !== roles.length) {
      const diff = roles.filter((role) => !rolesExist.map((r) => r.id).includes(role))
      throw new EntityNotFoundException(
        'Role',
        'Os cargos ' + diff.join(', ') + ' não foram encontrados.'
      )
    }

    volunteer
      .related('roles')
      .createMany(rolesExist.map((role) => ({ roleId: role.id, volunteerId: volunteer!.id })))

    return volunteer
  }

  async createSession(email: string, password: string) {
    const volunteer = await Volunteer.query()
      .select(['id', 'name', 'email', 'password', 'createdAt', 'registered'])
      .preload('roles', (rolesQuery) =>
        rolesQuery.preload('role', (roleQuery) =>
          roleQuery.preload('permissions', (permissionQuery) =>
            permissionQuery.preload('permission')
          )
        )
      )
      .where({ email })
      .first()

    if (!volunteer) throw new WrongPasswordException()

    const realVolunteer: VolunteerDto = VolunteerDto.fromPartial(volunteer)

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
    }

    const token = await this.tokenService.generate(volunteer)

    return { token, volunteer: { ...realVolunteer, registered: true } }
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

  async getVolunteers(page: number, limit: number, orderBy: string, order: 'asc' | 'desc') {
    const volunteersPagination = await Volunteer.query()
      .preload('roles', (rolesQuery) =>
        rolesQuery.preload('role', (roleQuery) =>
          roleQuery.preload('permissions', (permissionQuery) =>
            permissionQuery.preload('permission')
          )
        )
      )
      .orderBy(orderBy, order)
      .paginate(page, limit)

    const volunteers = volunteersPagination.all()

    return PageResult.toResult(volunteers.map(VolunteerDto.fromPartial), {
      currentPage: page,
      itemsPerPage: limit,
      totalPages: volunteersPagination.lastPage,
      totalItems: volunteersPagination.total,
    })
  }

  /**
   * Retorna um voluntário pelo ID ou null, caso não exista
   *
   * @param id - ID do voluntário
   * @return Volunteer | null
   *
   */

  async getVolunteer(query: { id?: string; email?: string }): Promise<VolunteerDto | null> {
    const volunteer = await Volunteer.query()
      .preload('roles', (rolesQuery) =>
        rolesQuery.preload('role', (roleQuery) =>
          roleQuery.preload('permissions', (permissionQuery) =>
            permissionQuery.preload('permission')
          )
        )
      )
      .where(query)
      .first()

    if (!volunteer) return null

    return VolunteerDto.fromPartial(volunteer)
  }

  /**
   * Atualiza as informações de um voluntário
   *
   * @param id - ID do voluntário
   * @param payload
   * @returns
   */

  /* async updateVolunteer(id: number, payload: any): Promise<any> {
    const volunteer = await Volunteer.findBy('id', id)

    if (!volunteer) {
      throw new Error('Voluntário não encontrado')
    }

    const oldVolunteer: { name: string; roles: string[] } = {
      name: volunteer?.name,
      role: volunteer?.role,
    }

    await volunteer
      .merge({
        name: payload.name,
        password: payload.password,
        roles: payload.roles,
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
      throw new EntityNotFoundException('Voluntário não encontrado')
    }

    await volunteer.delete()
  }
}
