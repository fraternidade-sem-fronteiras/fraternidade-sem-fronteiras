import InsufficientPermissionException from '@/exceptions/insufficient_permission.exception'
import InsufficientePermissionError from './dashboard/InsufficientePermissionError.jsx'
import { useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  if (error instanceof InsufficientPermissionException) {
    return <InsufficientePermissionError />
  }

  return <div>Error....</div>
}
