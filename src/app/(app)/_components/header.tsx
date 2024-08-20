'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { HeaderLink } from './header_link'
import { usePathname, useRouter } from 'next/navigation'
import { useUserSession } from '@/context/user_session_context'
import Link from 'next/link'
import Cookies from 'js-cookie'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function HeaderCustom() {
  const router = useRouter()
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
          Kart-TI
        </Link>
        <div className=" hidden md:flex items-center gap-4">
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
                Cookies.remove('userSession')
                window.location.href = '/'
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
        <div className="md:hidden">
          <Select
            value={pathname}
            onValueChange={(value) => {
              router.push(`${value}`)
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma opção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="/">Home</SelectItem>
              <SelectItem value="/resultados/corridas">Resultados</SelectItem>
              <SelectItem value="/classificacoes">Classificações</SelectItem>
              <SelectItem value="/pistas">Pistas</SelectItem>
              {userSession ? (
                <>
                  <SelectItem value="/admin/temporada">Admin</SelectItem>
                  <Button
                    className="w-full"
                    variant="destructive"
                    onClick={() => {
                      setUserSession(null)
                      Cookies.remove('userSession')
                      router.replace('/')
                    }}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <Button className="w-full">
                  <Link href="/login" prefetch={false}>
                    Login
                  </Link>
                </Button>
              )}
            </SelectContent>
          </Select>
        </div>
      </nav>
    </header>
  )
}
