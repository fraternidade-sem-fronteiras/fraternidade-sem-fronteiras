export default interface Volunteer {
  id: number

  name: string
  email: string

  roleId: number
  createdAt: number
}

export interface StoreableVolunteer extends Volunteer {
  token: string
}
