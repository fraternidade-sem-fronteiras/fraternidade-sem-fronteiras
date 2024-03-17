import LoginPage from '@/pages/LoginPage'
import { Outlet } from 'react-router-dom'
import { useUser } from '@/hooks/user.hook'
import UnregisteredException from '@/exceptions/unregistered.exception'

export default function PrivateRouteLayout() {
  const { isLoggedIn, volunteer } = useUser()

  console.log('registered', volunteer?.registered)

  if (isLoggedIn) {
    if (!volunteer?.registered) throw new UnregisteredException()

    return <Outlet />
  }

  return <LoginPage />
}
