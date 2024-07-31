'use client'

import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserSession, useUserSession } from '@/context/user_session_context'
import { useRouter } from 'next/navigation'

export default function Page() {
  const { userSession, setUserSession } = useUserSession()
  const router = useRouter()

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const username = (form.elements.namedItem('username') as HTMLInputElement)
      .value
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value

    if (
      username === process.env.NEXT_PUBLIC_USERNAME_LOGIN &&
      password === process.env.NEXT_PUBLIC_PASSWORD_LOGIN
    ) {
      if (process.env.NEXT_PUBLIC_NAME_ADMIN) {
        const sessionData: UserSession = {
          username: process.env.NEXT_PUBLIC_NAME_ADMIN,
        }
        setUserSession(sessionData)
        router.replace('/')
      }
    } else {
      alert('Usuário ou senha inválidos')
    }
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Faça login
          </h2>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            {userSession?.username}
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Ou{' '}
            <Link
              href="/"
              className="font-medium text-primary hover:text-primary/90"
              prefetch={false}
            >
              volte para o site
            </Link>
          </p>
        </div>
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleLogin}
        >
          <div>
            <Label
              htmlFor="username"
              className="block text-sm font-medium text-foreground"
            >
              Nome de usuário
            </Label>
            <div className="mt-1">
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Senha
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
