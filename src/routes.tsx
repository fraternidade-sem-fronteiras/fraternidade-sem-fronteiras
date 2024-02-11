import UserProvider from './providers/UserProvider.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SelectPage from './pages/SelectPage.tsx'
import AssistedProfilePage from './pages/assisted/AssistedProfilePage.tsx'
import AssistedStackPage from './pages/assisted/AssistedStackPage.tsx'
import RegisterAssistedPage from './pages/assisted/RegisterAssistedPage.tsx'
import SearchAssistedPage from './pages/assisted/SearchAssistedPage.tsx'
import NotFound from './components/errors/NotFound.tsx'
import VolunteerPage from './pages/VolunteerPage.tsx'
import AssistedFormPage from './pages/assisted/AssistedFormPage.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/index.scss'

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
