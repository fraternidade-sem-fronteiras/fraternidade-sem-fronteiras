import PrivateRouteLayout from './components/layouts/PrivateRouteLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import NavigationPage from './pages/NavigationPage.jsx'
import SearchVolunteerPage from './pages/volunteer/SearchVolunteerPage.jsx'
import AssistedProfilePage from './pages/assisted/AssistedProfilePage.jsx'
import AssistedStackPage from './pages/assisted/AssistedStackPage.jsx'
import SearchAssistedPage from './pages/assisted/SearchAssistedPage.jsx'
import DashboardLayout from './components/layouts/DashboardLayout.jsx'
import VolunteerProfilePage from './pages/volunteer/VolunteerProfilePage.jsx'
import RegisterVolunteerPage from './pages/volunteer/RegisterVolunteerPage.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import DefaultLayout from './components/layouts/DefaultLayout.jsx'
import EditVolunteerPage from './pages/volunteer/EditVolunteerPage.jsx'

const AssistedFormPage = lazy(() => import('./pages/assisted/AssistedFormPage.jsx'))
const NotFound = lazy(() => import('./components/errors/NotFound.jsx'))

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: 'dashboard',
        element: <PrivateRouteLayout />,
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
