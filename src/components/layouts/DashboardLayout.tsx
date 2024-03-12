import DefaultNavBar from '../navbar/DefaultNavBar.jsx'
import DashboardSuspenseFallback from '../suspense/DashboardSuspenseFallback.jsx'
import { useOutlet } from 'react-router-dom'
import { Suspense } from 'react'
import NotFound from '../errors/dashboard/NotFound.jsx'

export default function DashboardLayout() {
  const outlet = useOutlet()

  return (
    <>
      <DefaultNavBar />
      {outlet ? (
        <Suspense fallback={<DashboardSuspenseFallback />}>{outlet}</Suspense>
      ) : (
        <NotFound />
      )}
    </>
  )
}
