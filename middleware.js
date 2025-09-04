import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Let client-side authentication handle all admin route protection
  // This avoids conflicts between middleware and client-side auth
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}