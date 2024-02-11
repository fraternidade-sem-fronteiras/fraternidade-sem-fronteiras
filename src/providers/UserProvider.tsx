import React from 'react'
import UserContext from '../context/user.context.ts'
import { StoreableVolunteer } from '../entities/volunteer.entity.ts'

interface UserProviderProps {
  children?: React.ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({ children }: UserProviderProps) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    const localTheme = localStorage.getItem('theme')
    console.log('localTheme', localTheme)
    return localTheme ? (localTheme as 'light' | 'dark') : 'light'
  })
  const [volunteer, setVolunteer] = React.useState<StoreableVolunteer | null>(() => {
    const item = localStorage.getItem('volunteer')
    return item ? JSON.parse(item) : null
  })
  const isLoggedIn = !!volunteer

  const createSession = React.useCallback(
    async (email: string, passWord: string): Promise<StoreableVolunteer> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const volunteer: StoreableVolunteer = {
            id: 1,
            name: 'John Doe',
            email: email,
            levelId: 1,
            token: 'token',
            createdAt: Date.now(),
          }

          localStorage.setItem('volunteer', JSON.stringify(volunteer))
          setVolunteer(volunteer)
          resolve(volunteer)
        }, 2000)
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

  React.useLayoutEffect(() => {
    if (volunteer) {
      //TODO fazer verificação se o token é válido e pegar os dados atualizados do usuário
    }
  }, [])

  React.useLayoutEffect(() => {
    const changeTheme = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 't') {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        console.log('changed', newTheme)
      }
    }

    document.addEventListener('keydown', changeTheme)

    return () => {
      document.removeEventListener('keydown', changeTheme)
    }
  }, [theme])

  return (
    <UserContext.Provider
      value={{ theme, isLoggedIn, volunteer, createSession, finishSession, forceFinishSession }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
