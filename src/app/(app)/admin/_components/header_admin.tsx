'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { HeaderLink } from '../../_components/header_link'

export function HeaderAdmin() {
  // const { userSession, setUserSession } = useUserSession()
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
    return pathname === `/admin/${name}`
  }

  return (
    <nav className="flex items-center justify-center w-full my-5 gap-10">
      <HeaderLink
        href="/admin/temporada"
        prefetch={false}
        isActive={isActive('temporada')}
      >
        Temporada
      </HeaderLink>
      <HeaderLink
        href="/admin/piloto"
        prefetch={false}
        isActive={isActive('piloto')}
      >
        Piloto
      </HeaderLink>
      <HeaderLink
        href="/admin/corrida"
        prefetch={false}
        isActive={isActive('corrida')}
      >
        Corrida
      </HeaderLink>
      <HeaderLink
        href="/admin/pista"
        prefetch={false}
        isActive={isActive('pista')}
      >
        Pista
      </HeaderLink>
      <HeaderLink
        href="/admin/resultados"
        prefetch={false}
        isActive={isActive('resultados')}
      >
        Adicionar Resultados
      </HeaderLink>
    </nav>
  )
}
