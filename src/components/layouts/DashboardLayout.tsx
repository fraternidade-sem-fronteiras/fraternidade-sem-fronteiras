import NavBar from '../navbar/DefaultNavBar.jsx'
import DashboardSuspenseFallback from '../suspense/DashboardSuspenseFallback.jsx'
import { useOutlet } from 'react-router-dom'
import { Suspense } from 'react'
import NotFound from '../errors/NotFound.jsx'

export default function DashboardLayout() {
  const outlet = useOutlet()

  return (
    <>
      <NavBar />
      <Suspense fallback={<DashboardSuspenseFallback />}>{outlet ?? <NotFound />}</Suspense>
    </>
  )
}
