'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import Cookies from 'js-cookie'

export interface UserSession {
  username: string
}

interface UserSessionContextProps {
  userSession: UserSession | null
  setUserSession: React.Dispatch<React.SetStateAction<UserSession | null>>
}

const UserSessionContext = createContext<UserSessionContextProps | undefined>(
  undefined,
)

export const UserSessionProvider = ({ children }: { children: ReactNode }) => {
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    if (typeof window !== 'undefined') {
      const storedSession = Cookies.get('userSession')
      const cookieSession: UserSession | null = storedSession
        ? JSON.parse(storedSession)
        : null
      if (
        !cookieSession?.username ||
        cookieSession.username !== process.env.NEXT_PUBLIC_NAME_ADMIN
      ) {
        return null
      }
      return cookieSession
    }
    return null
  })

  useEffect(() => {
    if (userSession) {
      Cookies.set('userSession', JSON.stringify(userSession), {
        expires: 1 / 3,
      }) // 8 horas
    } else {
      Cookies.remove('userSession')
    }
  }, [userSession])

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserSessionContext.Provider>
  )
}

export const useUserSession = () => {
  const context = useContext(UserSessionContext)
  if (context === undefined) {
    throw new Error(
      'useUserSession deve ser usado dentro de um UserSessionProvider',
    )
  }
  return context
}
