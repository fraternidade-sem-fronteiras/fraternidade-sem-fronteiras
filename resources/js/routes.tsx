import UserProvider from '../../src/providers/UserProvider.jsx'
import EnvProvider from '../../src/providers/EnvProvider.jsx'
import PrivateRoute from '../../src/components/PrivateRoute.jsx'
import LoginPage from '../../src/pages/LoginPage.jsx'
import SelectPage from '../../src/pages/SelectPage.jsx'
import VolunteerPage from '../../src/pages/VolunteerPage.jsx'
import AssistedProfilePage from '../../src/pages/assisted/AssistedProfilePage.jsx'
import AssistedStackPage from '../../src/pages/assisted/AssistedStackPage.jsx'
import SearchAssistedPage from '../../src/pages/assisted/SearchAssistedPage.jsx'

import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

const AssistedFormPage = lazy(() => import('../../src/pages/assisted/AssistedFormPage.jsx'))
const NotFound = lazy(() => import('../../src/components/errors/NotFound.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <SelectPage />,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: <SelectPage />,
          },
          {
            path: 'listar',
            element: <VolunteerPage />,
          },
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
                path: 'registrar',
                element: <AssistedFormPage />,
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
