import { Outlet } from 'react-router-dom'
import useUser from '../../hooks/user.hook.js'
import LoginPage from '../../pages/LoginPage.jsx'

export default function PrivateRouteLayout() {
  const { isLoggedIn } = useUser()

  if (isLoggedIn) {
    return <Outlet />
  }

  return <LoginPage />
}
