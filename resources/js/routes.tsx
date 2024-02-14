import UserProvider from '../../src/providers/UserProvider.jsx'
import EnvProvider from '../../src/providers/EnvProvider.jsx'
import PrivateRouteLayout from '../../src/components/layouts/PrivateRouteLayout.jsx'
import LoginPage from '../../src/pages/LoginPage.jsx'
import NavigationPage from '../../src/pages/NavigationPage.jsx'
import SearchVolunteerPage from '../../src/pages/volunteer/SearchVolunteerPage.jsx'
import AssistedProfilePage from '../../src/pages/assisted/AssistedProfilePage.jsx'
import AssistedStackPage from '../../src/pages/assisted/AssistedStackPage.jsx'
import SearchAssistedPage from '../../src/pages/assisted/SearchAssistedPage.jsx'
import DashboardLayout from '../../src/components/layouts/DashboardLayout.jsx'
import VolunteerProfilePage from '../../src/pages/volunteer/VolunteerProfilePage.jsx'
import RegisterVolunteerPage from '../../src/pages/volunteer/RegisterVolunteerPage.jsx'

import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const AssistedFormPage = lazy(() => import('../../src/pages/assisted/AssistedFormPage.jsx'))
const NotFound = lazy(() => import('../../src/components/errors/NotFound.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRouteLayout />,
    children: [
      {
        path: 'dashboard/navegar',
        element: <NavigationPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: 'assistido',
            children: [
              {
                path: 'perfil',
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
                path: 'cadastrar',
                element: <RegisterVolunteerPage />,
              },
            ],
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

interface RoutesProps {
  env: Record<string, any>
}

export default function Routes({ env }: RoutesProps) {
  return (
    <ChakraProvider>
      <EnvProvider env={env}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </EnvProvider>
    </ChakraProvider>
  )
}
