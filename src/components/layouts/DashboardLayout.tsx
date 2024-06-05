import DefaultNavBar from '../navbar/DefaultNavBar.jsx'
import DashboardSuspenseFallback from '../suspense/DashboardSuspenseFallback.jsx'
import { useOutlet } from 'react-router-dom'
import { Suspense } from 'react'

export default function DashboardLayout() {
  const outlet = useOutlet()

  return (
    <>
      <DefaultNavBar />
      <Suspense fallback={<DashboardSuspenseFallback />}>{outlet}</Suspense>
    </>
  )
}
