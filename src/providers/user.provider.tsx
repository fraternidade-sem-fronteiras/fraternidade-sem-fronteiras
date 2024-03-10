import React from 'react'
import UserContext from '../context/user.context.js'
import getAxiosInstance from '../utils/axios.instance.js'
import useEnv from '../hooks/env.hook.js'
import { StoreableVolunteer } from '../entities/volunteer.entity.js'
import { useToast } from '@chakra-ui/react'

interface UserProviderProps {
  children?: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const { get } = useEnv()
  const [theme, setTheme] = React.useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'light'
  )
  const [volunteer, setVolunteer] = React.useState<StoreableVolunteer | null>(() => {
    const item = localStorage.getItem('volunteer')
    return item ? JSON.parse(item) : null
  })
  const isLoggedIn = !!volunteer

  const toast = useToast()

  React.useLayoutEffect(() => {
    getAxiosInstance().defaults.baseURL = get('API_URL')

    if (volunteer) {
      getAxiosInstance()
        .get('volunteers/profile', { headers: { Authorization: `Bearer ${volunteer.token}` } })
        .then(({ data }) => {
          const { id, email, name } = data

          const newVolunteer: StoreableVolunteer = { ...data, token: volunteer.token }

          if (id === volunteer.id && email === volunteer.email && name === volunteer.name) return

          localStorage.setItem('volunteer', JSON.stringify(newVolunteer))
          setVolunteer(newVolunteer)
        })
        .catch((error) => {
          toast({
            title: 'Sessão com problemas.',
            description:
              'Não foi possível recuperar os dados da sua sessão, alguns recursos podem não funcionar.',
            status: 'error',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          })
        })
    }
  }, [])

  React.useLayoutEffect(() => {
    if (!volunteer) return

    const responseInterceptor = getAxiosInstance().interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          toast({
            title: 'Sessão expirou.',
            description: 'Sua sessão expirou, faça login novamente.',
            status: 'error',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          })

          finishSession()
        }

        return new Promise(error)
      }
    )

    const requestInterceptor = getAxiosInstance().interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${volunteer.token ?? 'unknown'}`
      return config
    })

    return () => {
      if (!volunteer) return

      getAxiosInstance().interceptors.response.eject(responseInterceptor)
      getAxiosInstance().interceptors.request.eject(requestInterceptor)
    }
  }, [volunteer])

  React.useLayoutEffect(() => {
    const changeTheme = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === 't') {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        console.log('Theme changed to', newTheme)
      }
    }

    document.addEventListener('keydown', changeTheme)

    return () => {
      document.removeEventListener('keydown', changeTheme)
    }
  }, [theme])

  const createSession = React.useCallback(
    async (email: string, password: string): Promise<StoreableVolunteer> => {
      return new Promise<StoreableVolunteer>(async (resolve, reject) => {
        try {
          const { data } = await getAxiosInstance().post('volunteers/login', { email, password })

          const storeableVolunteer: StoreableVolunteer = { ...data.volunteer, token: data.token }

          localStorage.setItem('volunteer', JSON.stringify(storeableVolunteer))
          setVolunteer(storeableVolunteer)
          resolve(storeableVolunteer)
        } catch (error) {
          reject(error)
        }
      })
    },
    []
  )

  const forceFinishSession = React.useCallback(async () => {
    localStorage.removeItem('volunteer')
    setVolunteer(null)
  }, [])

  const finishSession = React.useCallback(() => {
    forceFinishSession()
    return Promise.resolve()
  }, [])

  return (
    <UserContext.Provider
      value={{ theme, isLoggedIn, volunteer, createSession, finishSession, forceFinishSession }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
