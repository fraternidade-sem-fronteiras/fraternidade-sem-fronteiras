import React from 'react'
import EnvContext, { EnvContextProps } from '../context/env.context.js'

export default function useEnv(): EnvContextProps {
  const context = React.useContext(EnvContext)
  if (!context) {
    throw new Error('useEnv must be used within a UserProvider')
  }
  return context
}
