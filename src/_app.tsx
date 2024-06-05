import { Suspense, lazy } from 'react'

import EnvProvider from '@/providers/env.provider'
import UserProvider from '@/providers/user.provider'
import ThemeProvider from '@/providers/theme.provider'

import SuspenseFallback from '@/components/suspense/SuspenseFallback'

const Routes = lazy(() => import('@/routes'))

interface RoutesProps {
  env: Record<string, any>
}

export default function App({ env }: Readonly<RoutesProps>) {
  return (
    <EnvProvider env={env}>
      <UserProvider>
        <ThemeProvider>
          <Suspense fallback={<SuspenseFallback />} >
            <Routes />
          </Suspense>
        </ThemeProvider>
      </UserProvider>
    </EnvProvider>
  )
}
