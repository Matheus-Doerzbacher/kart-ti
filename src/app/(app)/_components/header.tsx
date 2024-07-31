'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { HeaderLink } from './header_link'
import { usePathname } from 'next/navigation'
import { useUserSession } from '@/context/user_session_context'

export function HeaderCustom() {
  const { userSession, setUserSession } = useUserSession()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const isActive = (name: string) => {
    return pathname.includes(name)
  }

  return (
    <header className="bg-card py-4 px-6 shadow flex items-center h-20">
      <nav className="flex items-center justify-between w-full">
        <HeaderLink href="#">Gerenciador de Corridas de Kart</HeaderLink>
        <div className="flex items-center gap-4">
          {isClient && userSession !== undefined && (
            <>
              {userSession ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    setUserSession(null)
                  }}
                >
                  Sair
                </Button>
              ) : (
                <HeaderLink href="/login" prefetch={false}>
                  Login
                </HeaderLink>
              )}
              {userSession && (
                <HeaderLink
                  href="/admin"
                  prefetch={false}
                  isActive={isActive('admin')}
                >
                  Admin
                </HeaderLink>
              )}
            </>
          )}
          <HeaderLink
            href="/corridas"
            prefetch={false}
            isActive={isActive('corridas')}
          >
            Corridas
          </HeaderLink>
          <HeaderLink
            href="/classificacoes"
            prefetch={false}
            isActive={isActive('classificacoes')}
          >
            Classificações
          </HeaderLink>
          <HeaderLink
            href="/pistas"
            prefetch={false}
            isActive={isActive('pistas')}
          >
            Pistas
          </HeaderLink>
          <HeaderLink
            href="/pilotos"
            prefetch={false}
            isActive={isActive('pilotos')}
          >
            Pilotos
          </HeaderLink>
          <Button>
            <a href="/new-race">Nova Corrida</a>
          </Button>
        </div>
      </nav>
    </header>
  )
}
