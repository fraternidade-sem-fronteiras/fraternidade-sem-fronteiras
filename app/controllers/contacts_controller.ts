import ContactService from '#services/contact_service'
import { createContactValidator, updateContactValidator } from '#validators/contact'
import type { HttpContext } from '@adonisjs/core/http'

export default class ContactsController {
  constructor(readonly contactService: ContactService) {}
  /**
   * Lista de exibição de todos os Contacts do Assisted
   */
  async index({ response, params }: HttpContext) {
    const { assistedId } = params

    // busca todos os contatos do Assistido
    const contatos = await this.contactService.getContactsByAssistedId(assistedId)

    // retorna os contatos do assistido em formato json
    return response.json(contatos)
  }

  /**
   * Criar novo Contact no servidor
   */
  async store({ request, response }: HttpContext) {
    try {
      // valida as informações pelo Validator
      let payload = await createContactValidator.validate(request.all())

      // cria um Contact pelo Service
      let contact = await this.contactService.createContact(
        payload.assistedId,
        payload.name,
        payload.kinship,
        payload.phone ?? null,
        payload.email ?? null,
        payload.other ?? null
      )

      // retorna o Contact
      return response.status(201).json(contact)
    } catch (error) {
      // retorna a mensagem de erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }

  /**
   * Exibe os detalhes de um Contact específico
   */
  async show({ response, params }: HttpContext) {
    // desestrutura o id do Contact da requisição
    const { id } = params

    // busca o Contact pelo Service
    const contact = await this.contactService.getContactById(id)

    // retorna a mensagem de erro caso o Contact não exista
    if (!contact) {
      return response.status(404).json({ message: 'Contato não encontrado.' })
    }

    // retorna o Contact caso ele exista
    return response.json(contact)
  }

  /**
   * Atualiza Contact específico no servidor
   */
  async update({ request, response, params }: HttpContext) {
    // desestrutura o id do Contact da requisição
    const { id } = params

    try {
      // valida as informações pelo Validator
      let payload = await updateContactValidator.validate(request.all())

      // atualiza as informações pelo Service
      let data = await this.contactService.updateContact(id, payload)

      // retorna as atualizações realizadas
      return response.json({ ...data })
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }

  /**
   * Exclui um Contact específico
   */
  async destroy({ response, params }: HttpContext) {
    // desestrutura o id do Contact da requisição
    const { id } = params

    try {
      // deleta o Contact pelo Service
      await this.contactService.deleteContact(id)

      // retorna status de sucesso: deletado
      return response.status(204)
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message })
      }

      throw error
    }
  }
}
