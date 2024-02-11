import UserProvider from './providers/UserProvider.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SelectPage from './pages/SelectPage.jsx'
import AssistedProfilePage from './pages/assisted/AssistedProfilePage.jsx'
import AssistedStackPage from './pages/assisted/AssistedStackPage.jsx'
import RegisterAssistedPage from './pages/assisted/RegisterAssistedPage.jsx'
import SearchAssistedPage from './pages/assisted/SearchAssistedPage.jsx'
import NotFound from './components/errors/NotFound.jsx'
import VolunteerPage from './pages/VolunteerPage.jsx'
import AssistedFormPage from './pages/assisted/AssistedFormPage.jsx'
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
