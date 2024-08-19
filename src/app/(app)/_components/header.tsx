'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { HeaderLink } from './header_link'
import { usePathname } from 'next/navigation'
import { useUserSession } from '@/context/user_session_context'
import Link from 'next/link'

export function HeaderCustom() {
  const { userSession, setUserSession } = useUserSession()
  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-20 border-b shadow-sm">
        Carregando...
      </div>
    )
  }

  const isActive = (name: string) => {
    return pathname.includes(name)
  }

  return (
    <header className="bg-card py-4 px-6 shadow flex items-center h-20">
      <nav className="flex items-center justify-between w-full">
        <Link className="text-2xl font-bold text-primary" href="/">
          Gerenciador de Corridas de Kart
        </Link>
        <div className="flex items-center gap-4">
          {userSession && (
            <HeaderLink
              href="/admin/temporada"
              prefetch={false}
              isActive={isActive('admin')}
            >
              Admin
            </HeaderLink>
          )}
          <HeaderLink
            href="/resultados/corridas"
            prefetch={false}
            isActive={isActive('resultados')}
          >
            Resultados
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
            <Button>
              <Link href="/login" prefetch={false}>
                Login
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  )
}
