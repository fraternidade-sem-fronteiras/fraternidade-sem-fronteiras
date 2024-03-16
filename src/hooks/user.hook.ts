import React from 'react'
import UserContext, { UserContextProps } from '@/context/user.context'

export function useUser(): UserContextProps {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
