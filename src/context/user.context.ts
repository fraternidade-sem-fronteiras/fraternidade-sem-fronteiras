import React from 'react'
import { StoreableVolunteer } from '../entities/volunteer.entity.js'

export interface UserContextProps {
  theme: 'light' | 'dark'

  isLoggedIn: boolean
  volunteer: StoreableVolunteer | null

  hasPermission: (permission: string | string[]) => boolean
  hasAtLeastOnePermission: (permissions: string[]) => boolean

  createSession: (email: string, password: string) => Promise<StoreableVolunteer>
  finishSession: () => Promise<void>
  forceFinishSession: () => void

  toggleColorMode: () => void
}

const UserContext = React.createContext<UserContextProps | null>(null)

export default UserContext
