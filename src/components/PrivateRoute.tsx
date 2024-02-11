import { Outlet } from 'react-router-dom'
import useUser from '../hooks/useUser.js'
import LoginPage from '../pages/LoginPage.jsx'

export default function PrivateRoute() {
  const { theme, isLoggedIn } = useUser()

  return <div data-theme={theme}>{isLoggedIn ? <Outlet /> : <LoginPage />}</div>
}
