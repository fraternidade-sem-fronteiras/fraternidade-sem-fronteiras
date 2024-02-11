import React from 'react'
import { StoreableVolunteer } from '../entities/volunteer.entity.ts'

export interface UserContextProps {
  theme: 'light' | 'dark'

  isLoggedIn: boolean
  volunteer: StoreableVolunteer | null

  createSession: (email: string, password: string) => Promise<StoreableVolunteer>
  finishSession: () => Promise<void>
  forceFinishSession: () => void
}

const UserContext = React.createContext<UserContextProps | null>(null)

export default UserContext
