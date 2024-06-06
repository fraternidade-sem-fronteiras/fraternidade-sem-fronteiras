import Permission, { PermissionDto } from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const permissions: PermissionDto[] = [
      {
        id: 'CREATE_VOLUNTEER',
        name: 'Criar voluntário',
        description: 'Permite que o usuário adicione novos voluntários.',
      },
      {
        id: 'DELETE_VOLUNTEER',
        name: 'Excluir voluntário',
        description: 'Permite que o usuário adicione novos voluntários.',
      },
      {
        id: 'EDIT_VOLUNTEER',
        name: 'Editar voluntário',
        description: 'Permite que o usuário edite voluntários.',
      },
      {
        id: 'CREATE_ROLE',
        name: 'Criar cargo',
        description: 'Permite que o usuário crie novos cargos.',
      },
      {
        id: 'DELETE_ROLE',
        name: 'Excluir cargo',
        description: 'Permite que o usuário exclua cargos.',
      },
      { id: 'EDIT_ROLE', name: 'Editar cargo', description: 'Permite que o usuário edite cargos.' },

      {
        id: 'CREATE_PERMISSION',
        name: 'Criar permissão',
        description: 'Permite que o usuário crie novas permissões.',
      },
      {
        id: 'DELETE_PERMISSION',
        name: 'Excluir permissão',
        description: 'Permite que o usuário exclua permissões.',
      },
      {
        id: 'LIST_PERMISSION',
        name: 'Listar permissões',
        description: 'Permite que o usuário liste permissões.',
      },
      {
        id: 'MANAGE_ASSISTED',
        name: 'Gerenciar assistidos',
        description: 'Permite que o usuário gerencie assistidos.',
      },
      {
        id: 'CREATE_ASSISTED',
        name: 'Criar assistido',
        description: 'Permite que o usuário adicione novos assistidos.',
      },
      {
        id: 'DELETE_ASSISTED',
        name: 'Excluir assistido',
        description: 'Permite que o usuário exclua assistidos.',
      },
      {
        id: 'EDIT_ASSISTED',
        name: 'Editar assistido',
        description: 'Permite que o usuário edite assistidos.',
      },

      {
        id: 'VIEW_REPORT',
        name: 'Visualizar relatório',
        description: 'Permite que o usuário visualize relatórios.',
      },

      {
        id: 'ALL',
        name: 'Todas as permissões',
        description: 'Permite que o usuário tenha todas as permissões.',
      },
    ]

    await Permission.createMany(permissions)
  }
}
