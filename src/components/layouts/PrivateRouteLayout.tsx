import LoginPage from '@/pages/LoginPage'
import { Outlet } from 'react-router-dom'
import { useUser } from '@/hooks/user.hook'

export default function PrivateRouteLayout() {
  const { isLoggedIn, volunteer } = useUser()

  if (isLoggedIn) {
    if (volunteer?.registered) {
      return <p>Oxe, que estranho... você não deveria estar vendo essa página!</p>
    }

    return <Outlet />
  }

  return <LoginPage />
}
