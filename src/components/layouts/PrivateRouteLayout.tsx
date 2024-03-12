import LoginPage from '../../pages/LoginPage.jsx'
import { Outlet } from 'react-router-dom'
import { useUser } from '../../hooks/user.hook.js'

export default function PrivateRouteLayout() {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return <Outlet />
  }

  return <LoginPage />
}
