import ProfileAssistedPage from '@/pages/dashboard/assisted/ProfileAssistedPage'
import StackAssistedPage from '@/pages/dashboard/assisted/StackAssistedPage'
import ListAssistedPage from '@/pages/dashboard/assisted/ListAssistedPage'

import ListVolunteerPage from '@/pages/dashboard/volunteer/ListVolunteerPage'
import ProfileVolunteerPage from '@/pages/dashboard/volunteer/ProfileVolunteerPage'
import EditVolunteerPage from '@/pages/dashboard/volunteer/EditVolunteerPage'

import CreateRolePage from '@/pages/dashboard/roles/CreateRolePage'
import ListRolePage from '@/pages/dashboard/roles/ListRolePage'
import EditRolePage from '@/pages/dashboard/roles/EditRolePage'

import PrivateRouteLayout from '@/components/layouts/PrivateRouteLayout'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import DefaultLayout from '@/components/layouts/DefaultLayout'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const CreateAssistedPage = lazy(() => import('@/pages/dashboard/assisted/CreateAssistedPage'))

const CreateVolunteerPage = lazy(() => import('@/pages/dashboard/volunteer/CreateVolunteerPage'))

const ErrorBoundary = lazy(() => import('@/components/errors/ErrorBoundary'))

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const NavigationPage = lazy(() => import('@/pages/NavigationPage'))

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
                    element: <ProfileAssistedPage />,
                  },
                  {
                    path: ':userName/perfil',
                    element: <ProfileAssistedPage />,
                  },
                  {
                    path: 'fila',
                    element: <StackAssistedPage />,
                  },
                  {
                    path: 'procurar',
                    element: <ListAssistedPage />,
                  },
                  {
                    path: 'cadastrar',
                    element: <CreateAssistedPage />,
                  },
                ],
              },
              {
                path: 'voluntario',
                element: <DefaultLayout />,
                children: [
                  {
                    path: 'procurar',
                    element: <ListVolunteerPage />,
                  },
                  {
                    path: ':id/perfil',
                    element: <ProfileVolunteerPage />,
                  },
                  {
                    path: ':id/editar-perfil',
                    element: <EditVolunteerPage />,
                  },
                  {
                    path: 'cadastrar',
                    element: <CreateVolunteerPage />,
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
                    path: ':roleName/editar',
                    element: <EditRolePage />,
                  },
                  {
                    path: ':roleName/listar-usuarios',
                    element: <EditRolePage />,
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
