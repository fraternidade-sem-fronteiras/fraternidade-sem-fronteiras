import React from 'react'
import EnvContext from '@/context/env.context'

interface EnvProviderProps {
  children?: React.ReactNode
  env: Record<string, any>
}

const EnvProvider: React.FC<EnvProviderProps> = ({ children, env }: EnvProviderProps) => {
  return (
    <EnvContext.Provider value={{ env, get: (key: string) => env[key] }}>
      {children}
    </EnvContext.Provider>
  )
}

export default EnvProvider
