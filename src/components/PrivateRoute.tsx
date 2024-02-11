import { Outlet } from 'react-router-dom'
import useUser from '../hooks/useUser.ts'
import LoginPage from '../pages/LoginPage.tsx'

export default function PrivateRoute() {
  const { theme, isLoggedIn } = useUser()

  return <div data-theme={theme}>{isLoggedIn ? <Outlet /> : <LoginPage />}</div>
}
