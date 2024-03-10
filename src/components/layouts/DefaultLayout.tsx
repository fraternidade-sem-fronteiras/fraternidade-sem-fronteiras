import { useOutlet } from 'react-router-dom'
import NotFound from '../errors/NotFound.jsx'

export default function DefaultLayout() {
  const outlet = useOutlet()

  if (outlet) {
    return outlet
  }

  return <NotFound />
}
