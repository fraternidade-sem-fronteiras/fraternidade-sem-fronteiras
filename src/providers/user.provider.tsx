import React, { ReactNode, useCallback, useLayoutEffect, useState } from 'react'
import UserContext from '@/context/user.context'
import axios from '@/utils/axios.instance'
import useToast from '@/hooks/toast.hook'
import { useEnv } from '@/hooks/env.hook'
import { StoreableVolunteer } from '@/entities/volunteer.entity'
import { deepEqual } from '@/utils/utils'
import {
  hasPermission as hasRolePermission,
  hasAtLeastOnePermission as hasRoleAtLeastOnePermission,
} from '@/entities/volunteer.entity'

interface UserProviderProps {
  children?: ReactNode
}

const useUserToast = () => {
  const { handleErrorToast } = useToast()

  return {
    handleSessionExpiredError: () => {
      handleErrorToast(
        'Sua sessão expirou',
        'Sua sessão expirou, faça login novamente para continuar.',
        3000
      )
    },
    handleGenericError: () => {
      handleErrorToast(
        'Sessão com problemas.',
        'Não foi possível recuperar os dados da sua sessão, alguns recursos podem não funcionar.'
      )
    },
    handleInvalidTokenError: () => {
      handleErrorToast(
        'Não autorizado',
        'Sua sessão expirou ou seu token de acesso não é válido, faça login novamente para continuar.'
      )
    },
    handleUnregisteredTokenError: () => {
      handleErrorToast(
        'Não autorizado',
        'Sua conta não está registrada ou foi desativada, entre em contato com o administrador do sistema.'
      )
    },
  }
}

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const { get } = useEnv()
  const {
    handleSessionExpiredError,
    handleGenericError,
    handleInvalidTokenError,
    handleUnregisteredTokenError,
  } = useUserToast()

  const [logoutTimeout, setLogoutTimeout] = useState<NodeJS.Timeout | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'light'
  )
  const [volunteer, setVolunteer] = useState<StoreableVolunteer | null>(() => {
    const item = localStorage.getItem('volunteer')

    if (!item) return null

    const user = JSON.parse(item)
    const expiresAt = user.expiresAt

    setLogoutTimeout(
      setTimeout(() => {
        handleSessionExpiredError()
        forceFinishSession()
      }, expiresAt - Date.now())
    )

    return user
  })

  const isLoggedIn = !!volunteer

  useLayoutEffect(() => {
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
            handleGenericError()
            return
          }

          const statusCode = response.status

          if (statusCode === 401) {
            handleInvalidTokenError()
            forceFinishSession()
          } else if (statusCode === 403) {
            handleUnregisteredTokenError()
          }
        })
    }
  }, [])

  useLayoutEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (volunteer) config.headers.Authorization = `Bearer ${volunteer.token ?? 'unknown'}`
      return config
    })

    return () => {
      axios.interceptors.request.eject(requestInterceptor)
    }
  }, [volunteer])

  const hasPermission = useCallback(
    (permission: string | string[]): boolean => hasRolePermission(volunteer, permission),
    [volunteer]
  )

  const hasAtLeastOnePermission = useCallback(
    (permissions: string[]): boolean => hasRoleAtLeastOnePermission(volunteer, permissions),
    [volunteer]
  )

  const createSession = useCallback(
    async (email: string, password: string): Promise<StoreableVolunteer> => {
      return new Promise<StoreableVolunteer>((resolve, reject) => {
        axios
          .post('volunteers/login', { email, password })
          .then(({ data }) => {
            const expiresAt = data.expiresAt

            const storeableVolunteer: StoreableVolunteer = {
              ...data.volunteer,
              token: data.token,
              expiresAt: expiresAt,
            }

            setLogoutTimeout(
              setTimeout(() => {
                handleSessionExpiredError()
                forceFinishSession()
              }, expiresAt - Date.now())
            )

            localStorage.setItem('volunteer', JSON.stringify(storeableVolunteer))
            setVolunteer(storeableVolunteer)
            resolve({ ...storeableVolunteer, registered: data.registered })
          })
          .catch(reject)
      })
    },
    []
  )

  const forceFinishSession = useCallback(() => {
    localStorage.removeItem('volunteer')
    setVolunteer(null)

    if (logoutTimeout) clearTimeout(logoutTimeout)
  }, [logoutTimeout])

  const finishSession = useCallback(() => {
    return new Promise<void>((resolve) => {
      axios.post('volunteers/logout').finally(() => {
        forceFinishSession()
        resolve()
      })
    })
  }, [])

  const toggleColorMode = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }, [theme])

  return (
    <UserContext.Provider
      value={{
        theme,
        isLoggedIn,
        volunteer,

        hasPermission,
        hasAtLeastOnePermission,

        createSession,
        finishSession,
        forceFinishSession,

        toggleColorMode,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
