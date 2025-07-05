import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Check if the route is an admin route (but not the login page)
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/admin') {
    try {
      // Get the session token from cookies
      const token = req.cookies.get('sb-access-token')?.value || 
                   req.cookies.get('sb-refresh-token')?.value
      
      if (!token) {
        // Redirect to admin login if no token
        return NextResponse.redirect(new URL('/admin', req.url))
      }

      // For now, we'll let the client-side handle the detailed auth check
      // The real validation will happen in the component
      
    } catch (error) {
      console.error('Middleware error:', error)
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
} 