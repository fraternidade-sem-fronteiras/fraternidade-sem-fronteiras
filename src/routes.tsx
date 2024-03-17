import PrivateRouteLayout from '@/components/layouts/PrivateRouteLayout'
import LoginPage from '@/pages/LoginPage'
import NavigationPage from '@/pages/NavigationPage'
import SearchVolunteerPage from '@/pages/dashboard/volunteer/SearchVolunteerPage'
import AssistedProfilePage from '@/pages/dashboard/assisted/AssistedProfilePage'
import AssistedStackPage from '@/pages/dashboard/assisted/AssistedStackPage'
import SearchAssistedPage from '@/pages/dashboard/assisted/SearchAssistedPage'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import VolunteerProfilePage from '@/pages/dashboard/volunteer/VolunteerProfilePage'
import RegisterVolunteerPage from '@/pages/dashboard/volunteer/RegisterVolunteerPage'
import CreateRolePage from '@/pages/dashboard/roles/CreateRolePage'
import ListRolePage from '@/pages/dashboard/roles/ListRolePage'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import EditVolunteerPage from '@/pages/dashboard/volunteer/EditVolunteerPage'
import ErrorBoundary from '@/components/errors/ErrorBoundary'

const AssistedFormPage = lazy(() => import('@/pages/dashboard/assisted/AssistedFormPage'))
const NotFound = lazy(() => import('@/components/errors/NotFoundError'))

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'dashboard',
        element: <PrivateRouteLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: '',
            element: <DashboardLayout />,
            children: [
              {
                path: 'assistido',
                element: <DefaultLayout />,
                children: [
                  {
                    path: 'perfil',
                    element: <AssistedProfilePage />,
                  },
                  {
                    path: ':userName/perfil',
                    element: <AssistedProfilePage />,
                  },
                  {
                    path: 'fila',
                    element: <AssistedStackPage />,
                  },
                  {
                    path: 'procurar',
                    element: <SearchAssistedPage />,
                  },
                  {
                    path: 'cadastrar',
                    element: <AssistedFormPage />,
                  },
                ],
              },
              {
                path: 'voluntario',
                element: <DefaultLayout />,
                children: [
                  {
                    path: 'procurar',
                    element: <SearchVolunteerPage />,
                  },
                  {
                    path: 'perfil',
                    element: <VolunteerProfilePage />,
                  },
                  {
                    path: ':id/editar-perfil',
                    element: <EditVolunteerPage />,
                  },
                  {
                    path: 'cadastrar',
                    element: <RegisterVolunteerPage />,
                  },
                ],
              },
              {
                path: 'cargo',
                element: <DefaultLayout />,
                children: [
                  {
                    path: 'cadastrar',
                    element: <CreateRolePage />,
                  },
                  {
                    path: '',
                    element: <ListRolePage />,
                  },
                ],
              },
            ],
          },
          {
            path: 'navegar',
            element: <NavigationPage />,
          },
        ],
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default function Routes() {
  return <RouterProvider router={router} />
}
