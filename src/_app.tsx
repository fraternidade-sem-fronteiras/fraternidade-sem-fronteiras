import { Suspense, lazy } from 'react'

const EnvProvider = lazy(() => import('@/providers/env.provider'))
const UserProvider = lazy(() => import('@/providers/user.provider'))
const ThemeProvider = lazy(() => import('@/providers/theme.provider'))

const SuspenseFallback = lazy(() => import('@/components/suspense/SuspenseFallback'))

const Routes = lazy(() => import('@/routes'))

interface RoutesProps {
  env: Record<string, any>
}

export default function App({ env }: Readonly<RoutesProps>) {
  return (
    <EnvProvider env={env}>
      <UserProvider>
        <ThemeProvider>
          <Suspense fallback={<SuspenseFallback />}>
            <Routes />
          </Suspense>
        </ThemeProvider>
      </UserProvider>
    </EnvProvider>
  )
}
