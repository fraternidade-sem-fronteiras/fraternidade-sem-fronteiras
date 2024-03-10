import { Suspense, lazy } from 'react'
import EnvProvider from './providers/env.provider.jsx'
import SuspenseFallback from './components/suspense/SuspenseFallback.jsx'
import UserProvider from './providers/user.provider.jsx'
import ThemeProvider from './providers/theme.provider.jsx'

const Routes = lazy(() => import('./routes.jsx'))

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
