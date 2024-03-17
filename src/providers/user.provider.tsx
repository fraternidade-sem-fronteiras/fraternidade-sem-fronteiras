import React, { useCallback } from 'react'
import UserContext from '@/context/user.context'
import axios from '@/utils/axios.instance'
import useToast from '@/hooks/toast.hook'
import { useEnv } from '@/hooks/env.hook'
import { StoreableVolunteer } from '@/entities/volunteer.entity'
import { deepEqual } from '@/utils/utils'

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

  const { handleErrorToast } = useToast()

  React.useLayoutEffect(() => {
    axios.defaults.baseURL = get('API_URL')

    if (volunteer) {
      axios
        .get('volunteers/profile', { headers: { Authorization: `Bearer ${volunteer.token}` } })
        .then(({ data }) => {
          const newVolunteer: StoreableVolunteer = { ...data, token: volunteer.token }

          if (deepEqual(newVolunteer, volunteer)) return

          localStorage.setItem('volunteer', JSON.stringify(newVolunteer))
          setVolunteer(newVolunteer)
        })
        .catch(({ response }) => {
          if (!response) {
            handleErrorToast(
              'Sessão com problemas.',
              'Não foi possível recuperar os dados da sua sessão, alguns recursos podem não funcionar.'
            )
            return
          }

          const statusCode = response.status

          if (statusCode === 401) {
            handleErrorToast(
              'Não autorizado',
              'Sua sessão expirou ou seu token de acesso não é válido, faça login novamente para continuar.'
            )
          }
        })
    }
  }, [])

  React.useLayoutEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (volunteer) config.headers.Authorization = `Bearer ${volunteer.token ?? 'unknown'}`
      return config
    })

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
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
    async (
      email: string,
      password: string
    ): Promise<StoreableVolunteer & { registered: true | undefined }> => {
      return new Promise<StoreableVolunteer & { registered: true | undefined }>(
        (resolve, reject) => {
          axios
            .post('volunteers/login', { email, password })
            .then(({ data }) => {
              const storeableVolunteer: StoreableVolunteer = {
                ...data.volunteer,
                token: data.token,
              }

              localStorage.setItem('volunteer', JSON.stringify(storeableVolunteer))
              setVolunteer(storeableVolunteer)
              resolve({ ...storeableVolunteer, registered: data.registered })
            })
            .catch(reject)
        }
      )
    },
    []
  )

  const forceFinishSession = useCallback(async () => {
    localStorage.removeItem('volunteer')
    setVolunteer(null)
  }, [])

  const finishSession = useCallback(() => {
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
