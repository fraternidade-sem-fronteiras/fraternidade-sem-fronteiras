import NavBar from '../navbar/DefaultNavBar.jsx'
import DashboardSuspenseFallback from '../suspense/DashboardSuspenseFallback.jsx'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

export default function DashboardLayout() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<DashboardSuspenseFallback />}>
        <Outlet />
      </Suspense>
    </>
  )
}
