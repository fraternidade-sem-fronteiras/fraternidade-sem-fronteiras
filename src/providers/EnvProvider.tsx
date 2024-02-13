import React from 'react'
import EnvContext from '../context/env.context.js'

interface UserProviderProps {
  children?: React.ReactNode
  env: Record<string, any>
}

const UserProvider: React.FC<UserProviderProps> = ({ children, env }: UserProviderProps) => {
  return (
    <EnvContext.Provider value={{ env, get: (key: string) => env[key] }}>
      {children}
    </EnvContext.Provider>
  )
}

export default UserProvider
