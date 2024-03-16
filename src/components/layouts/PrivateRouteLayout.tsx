import LoginPage from '@/pages/LoginPage'
import { Outlet } from 'react-router-dom'
import { useUser } from '@/hooks/user.hook'

export default function PrivateRouteLayout() {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return <Outlet />
  }

  return <LoginPage />
}
