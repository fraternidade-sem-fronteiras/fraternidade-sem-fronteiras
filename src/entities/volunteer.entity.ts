export default interface Volunteer {
  id: number

  name: string
  email: string

  levelId: number
}

export interface StoreableVolunteer extends Volunteer {
  token: string
  createdAt: number
}
