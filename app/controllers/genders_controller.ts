import GenderService from '#services/gender_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GendersController {
  constructor(readonly genderService: GenderService) {}
  /**
   * Lista de exibição de todos os Genders
   */
  public async index({ response }: HttpContext) {
    // busca todos os genêros
    const genders = await this.genderService.getGenders()

    // retorna os gêneros em formato json
    return response.json(genders)
  }

  /**
   * Oferece formulário para criar novo Gender
   */
  public async new({}: HttpContext) {
    /**
     * Não retorna nada por enquanto
     */
  }

  /**
   * Criar novo Gender no servidor
   */
  public async store({ }: HttpContext) {
    // try {
    //   // valida as informações pelo Validator
    //   let payload = await request.validate(GenderValidator)

    //   // cria um Gender pelo Service
    //   let gender = await this.genderService.createGender(payload.name)

    //   // retorna o Gender
    //   return response.status(201).json(gender)
    // } catch (error) {
    //   // retorna a mensagem de erro, caso alguma instrução do try dê problema
    //   return response.status(409).json({ ...error })
    // }
  }

  /**
   * Exibe os detalhes de um Gender específico
   */
  public async show({ response, params }: HttpContext) {
    // desestrutura o id do Gender da requisição
    const { id } = params

    // busca o Gender pelo Service
    const gender = await this.genderService.getGenderById(id)

    // retorna a mensagem de erro caso o Gender não exista
    if (!gender) {
      return response.status(404).json({ message: 'Gênero não encontrado.' })
    }

    // retorna o Gender caso ele exista
    return response.json(gender)
  }

  /**
   * Oferece formulário para editar Gender específico
   */
  public async edit({ response, params }: HttpContext) {
    // desestrutura o id do Gender da requisição
    const { id } = params

    // busca o Gender pelo Service
    const gender = await this.genderService.getGenderById(id)

    // retorna a mensagem de erro caso o Gender não exista
    if (!gender) {
      return response.status(404).json({ message: 'Gênero não encontrado.' })
    }

    // retorna o Gender caso ele exista
    return response.json(gender)
  }

  /**
   * Atualiza Gender específico no servidor
   */
  public async update({ }: HttpContext) {
    // // desestrutura o id do Gender da requisição
    // const { id } = params

    // try {
    //   // valida as informações pelo Validator
    //   let payload = await request.validate(GenderValidator)

    //   // atualiza as informações pelo Service
    //   let data = await this.genderService.updateGender(id, payload.name)

    //   // retorna as atualizações realizadas
    //   return response.json({ ...data })
    // } catch (error) {
    //   // retorna erro, caso alguma instrução do try dê problema
    //   return response.status(404).json({ ...error })
    // }
  }

  /**
   * Exclui um Gender específico
   */
  public async destroy({ response, params }: HttpContext) {
    // desestrutura o id do Gender da requisição
    const { id } = params

    try {
      // deleta o Gender pelo Service
      await this.genderService.deleteGender(id)

      // retorna status de sucesso: deletado
      return response.status(204)
    } catch (error) {
      // retorna erro, caso alguma instrução do try dê problema
      if (error instanceof Error) {
        return response.status(404).json({ message: error.message })
      }
      
      throw error
    }
  }
}
