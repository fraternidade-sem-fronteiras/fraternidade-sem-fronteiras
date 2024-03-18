import InsufficientPermissionException from '@/exceptions/insufficient_permission.exception'
import InsufficientePermissionError from './dashboard/InsufficientePermissionError.jsx'
import UnregisteredException from '@/exceptions/insufficient_permission.exception'
import UnregisteredError from './dashboard/UnregisteredError.jsx'
import ServerError from './ServerError.jsx'
import { useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (error instanceof InsufficientPermissionException) {
    return <InsufficientePermissionError permissions={error.permissions} />
  }

  if (error instanceof UnregisteredException) {
    return <UnregisteredError />
  }

  return <ServerError />
}
