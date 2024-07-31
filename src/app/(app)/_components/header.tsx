'use client'

import { Button } from '@/components/ui/button'
import { HeaderLink } from './header_link'
import { usePathname } from 'next/navigation'

export function HeaderCustom() {
  const pathname = usePathname()

  const isActive = (name: string) => {
    return pathname.includes(name)
  }
  return (
    <header className="bg-card py-4 px-6 shadow flex items-center h-20">
      <nav className="flex items-center justify-between w-full">
        <HeaderLink href="#">Gerenciador de Corridas de Kart</HeaderLink>
        <div className="flex items-center gap-4">
          <HeaderLink href="/login" prefetch={false}>
            Login
          </HeaderLink>
          <HeaderLink
            href="/admin"
            prefetch={false}
            isActive={isActive('admin')}
          >
            Admin
          </HeaderLink>
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
