import ActivityService from '#services/activity_service'
import { createActivityValidator } from '#validators/activity'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ActivitiesController {
  constructor(readonly activityService: ActivityService) {}

  async index({ response }: HttpContext) {
    const activities = await this.activityService.getActivities()
    return response.json(activities)
  }

  async store({ request, response }: HttpContext) {
    const createAssistedDto = await createActivityValidator.validate(request.all())
    const activity = await this.activityService.createActivity(createAssistedDto)
    return response.status(201).json(activity)
  }

  async show({ response, params }: HttpContext) {
    const { id } = params

    const activity = await this.activityService.getActivityById(id)

    if (!activity) {
      return response.status(404).json({ message: 'Atividade não encontrada.' })
    }

    return response.json(activity)
  }

  async destroy({ response, params }: HttpContext) {
    const { id } = params
    await this.activityService.deleteActivity(id)
    return response.status(204)
  }
}
