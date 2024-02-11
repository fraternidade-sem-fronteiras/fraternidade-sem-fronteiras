import UserProvider from '../../src/providers/UserProvider.jsx'
import PrivateRoute from '../../src/components/PrivateRoute.jsx'
import LoginPage from '../../src/pages/LoginPage.jsx'
import SelectPage from '../../src/pages/SelectPage.jsx'
import AssistedProfilePage from '../../src/pages/assisted/AssistedProfilePage.jsx'
import AssistedStackPage from '../../src/pages/assisted/AssistedStackPage.jsx'
import RegisterAssistedPage from '../../src/pages/assisted/RegisterAssistedPage.jsx'
import SearchAssistedPage from '../../src/pages/assisted/SearchAssistedPage.jsx'
import NotFound from '../../src/components/errors/NotFound.jsx'
import VolunteerPage from '../../src/pages/VolunteerPage.jsx'
import AssistedFormPage from '../../src/pages/assisted/AssistedFormPage.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import '../../src/styles/index.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '',
        element: <LoginPage />,
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
                path: 'registrar',
                element: <RegisterAssistedPage />,
              },
              {
                path: 'procurar',
                element: <SearchAssistedPage />,
              },
              {
                path: 'formulario',
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

export default function Routes() {
  return (
    <ChakraProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
  )
}
