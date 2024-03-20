import LoginPage from '@/pages/LoginPage'
import UnregisteredException from '@/exceptions/unregistered.exception'
import InsufficientPermissionException from '@/exceptions/insufficient_permission.exception'
import { Outlet, useLocation } from 'react-router-dom'
import { useUser } from '@/hooks/user.hook'
import { useEffect } from 'react'

interface PrivateRouteLayoutProps {
  permissions: Path[]
}

interface Path {
  path: string
  permission?: string[]
  children?: Path[]
}

function getNeededPermissions(pathname: string, paths: Path[], idx: number = 0): string[][] {
  const pathParts = pathname.split('/').filter((part) => part !== '')

  if (idx === pathParts.length) return []

  const currentPath = paths.find((p) => {
    const [firstPart, secondPart] = p.path.split('/')

    if (secondPart && firstPart === '*') {
      return idx + 1 < pathParts.length && secondPart === pathParts[idx + 1]
    }

    return p.path === pathParts[idx]
  })

  if (currentPath) {
    if (currentPath.path.includes('/')) {
      const [firstPath, ..._] = currentPath.path.split('/')
      if (firstPath === '*') {
        if (currentPath.permission)
          return [
            currentPath.permission,
            ...getNeededPermissions(pathname, currentPath.children || [], idx + 2),
          ]

        return [...getNeededPermissions(pathname, currentPath.children || [], idx + 2)]
      }
    }

    if (currentPath.permission)
      return [
        currentPath.permission,
        ...getNeededPermissions(pathname, currentPath.children || [], idx + 1),
      ]

    return [...getNeededPermissions(pathname, currentPath.children || [], idx + 1)]
  }

  return []
}

export default function PrivateRouteLayout({ permissions }: Readonly<PrivateRouteLayoutProps>) {
  const { isLoggedIn, volunteer, hasAtLeastOnePermission } = useUser()
  const { pathname } = useLocation()

  useEffect(() => {
    if (volunteer) {
      if (!volunteer.registered) throw new UnregisteredException()

      const routeNeededPermissions = getNeededPermissions(pathname, permissions)

      const neededPermissions = routeNeededPermissions.find(
        (perm) => !hasAtLeastOnePermission(perm)
      )

      if (neededPermissions) throw new InsufficientPermissionException(neededPermissions)
    }
  }, [])

  if (isLoggedIn) {
    return <Outlet />
  }

  return <LoginPage />
}
