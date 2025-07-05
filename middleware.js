import { NextResponse } from 'next/server'

export async function middleware(req) {
  console.log('🔵 Middleware: Route accessed:', req.nextUrl.pathname)
  
  // Check if the route is an admin route (but not the login page)
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin') {
    try {
      // Check for Supabase session cookies
      const cookies = req.cookies
      const accessToken = cookies.get('sb-access-token')
      const refreshToken = cookies.get('sb-refresh-token')
      
      // Look for any Supabase auth cookies (they might have different names)
      const hasSupabaseAuth = [...cookies.keys()].some(key => 
        key.includes('supabase') || key.includes('sb-')
      )
      
      console.log('🔵 Middleware: Auth cookies check:', { 
        hasAccessToken: !!accessToken, 
        hasRefreshToken: !!refreshToken,
        hasSupabaseAuth,
        allCookies: [...cookies.keys()]
      })
      
      // If no auth cookies at all, redirect to login
      if (!hasSupabaseAuth && !accessToken && !refreshToken) {
        console.log('🔴 Middleware: No auth cookies found, redirecting to login')
        return NextResponse.redirect(new URL('/admin', req.url))
      }

      console.log('✅ Middleware: Auth cookies present, allowing access')
      return NextResponse.next()
      
    } catch (error) {
      console.error('🔴 Middleware error:', error)
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 