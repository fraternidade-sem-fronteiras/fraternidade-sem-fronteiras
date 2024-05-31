import ProfileAssistedPage from '@/pages/dashboard/assisted/ProfileAssistedPage'
import StackAssistedPage from '@/pages/dashboard/assisted/StackAssistedPage'
import ListAssistedPage from '@/pages/dashboard/assisted/ListAssistedPage'

import ProfileVolunteerPage from '@/pages/dashboard/volunteer/ProfileVolunteerPage'
import EditVolunteerPage from '@/pages/dashboard/volunteer/EditVolunteerPage'

import ListRolePage from '@/pages/dashboard/roles/ListRolePage'
import EditRolePage from '@/pages/dashboard/roles/EditRolePage'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const PrivateRouteLayout = lazy(() => import('@/components/layouts/PrivateRouteLayout'))
const DashboardLayout = lazy(() => import('@/components/layouts/DashboardLayout'))
const DefaultLayout = lazy(() => import('@/components/layouts/DefaultLayout'))

const CreateAssistedPage = lazy(() => import('@/pages/dashboard/assisted/CreateAssistedPage'))

const CreateVolunteerPage = lazy(() => import('@/pages/dashboard/volunteer/CreateVolunteerPage'))
const ListVolunteerPage = lazy(() => import('@/pages/dashboard/volunteer/ListVolunteerPage'))

const CreateRolePage = lazy(() => import('@/pages/dashboard/roles/CreateRolePage'))

const ErrorBoundary = lazy(() => import('@/components/errors/ErrorBoundary'))

const LoginPage = lazy(() => import('@/pages/LoginPage'))
const NavigationPage = lazy(() => import('@/pages/NavigationPage'))

const NotFound = lazy(() => import('@/components/errors/NotFoundError'))

const permissions = [
  {
    path: 'dashboard',
    children: [
      {
        path: 'assistido',
        children: [
          {
            path: 'cadastrar',
            permission: ['CREATE_ASSISTED'],
          },
        ],
      },
      {
        path: 'voluntario',
        children: [
          {
            path: 'cadastrar',
            permission: ['CREATE_VOLUNTEER'],
          },
        ],
      },
      {
        path: 'cargo',
        permission: ['CREATE_ROLE', 'DELETE_ROLE', 'EDIT_ROLE', 'LIST_ROLE'],
        children: [
          {
            path: '*/editar',
            permission: ['CREATE_ROLE'],
          },
        ],
      },
    ],
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'dashboard',
        element: <PrivateRouteLayout permissions={permissions} />,
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
                    path: ':id/perfil',
                    element: <ProfileAssistedPage />,
                  },
                  {
                    path: 'fila',
                    element: <StackAssistedPage />,
                  },
                  {
                    path: 'cadastrar',
                    element: <CreateAssistedPage />,
                  },
                  {
                    path: '',
                    element: <ListAssistedPage />,
                  },
                ],
              },
              {
                path: 'voluntario',
                element: <DefaultLayout />,
                children: [
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
                  {
                    path: '',
                    element: <ListVolunteerPage />,
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
                    path: ':roleId/editar',
                    element: <EditRolePage />,
                  },
                  {
                    path: ':roleId/listar-usuarios',
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
