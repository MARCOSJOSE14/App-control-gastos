import { jwtVerify } from 'jose'
import { NextResponse } from 'next/server'

export async function middleware (request) {
  const jwt = request.cookies.get('LoginToken')?.value

  if (jwt) {
    try {
      await jwtVerify(
        jwt,
        new TextEncoder().encode('Secreto')
      )
      if (request.nextUrl.pathname.includes('/login')) {
        return NextResponse.redirect(new URL('/cuenta', request.url))
      }
      return NextResponse.next()
    } catch (error) {
      if (request.nextUrl.pathname.includes('/login')) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    if (request.nextUrl.pathname.includes('/login')) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/login', '/cuenta/:path*', '/config/:path*']
}
