import Level from '#models/level'

export default class LevelService {
  async getLevels() {
    return await Level.all()
  }
}
