import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserSession } from './context/user_session_context'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Verifica se existe um token de autenticação nos cookies
    const storedSession = request.cookies.get('userSession')
    const cookieSession: UserSession | null = storedSession
      ? JSON.parse(storedSession.value)
      : null

    if (
      !cookieSession?.username ||
      cookieSession.username !== process.env.NEXT_PUBLIC_NAME_ADMIN
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
