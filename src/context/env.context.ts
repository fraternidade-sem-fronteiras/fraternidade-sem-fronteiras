import React from 'react'

export interface EnvContextProps {
  env: Record<string, any>
  get: (key: string) => any
}

const EnvContext = React.createContext<EnvContextProps | null>(null)

export default EnvContext
