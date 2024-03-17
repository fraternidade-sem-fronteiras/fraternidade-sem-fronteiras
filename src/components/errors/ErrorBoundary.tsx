import InsufficientPermissionException from '@/exceptions/insufficient_permission.exception'
import InsufficientePermissionError from './dashboard/InsufficientePermissionError.jsx'
import UnregisteredException from '@/exceptions/insufficient_permission.exception'
import UnregisteredError from './dashboard/UnregisteredError.jsx'
import { useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (error instanceof InsufficientPermissionException) {
    return <InsufficientePermissionError />
  }

  if (error instanceof UnregisteredException) {
    return <UnregisteredError />
  }

  return <div>{JSON.stringify(error)}</div>
}
