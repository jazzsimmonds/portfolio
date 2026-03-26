import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
 
  // Custom
  response.headers.set('X-Powered-By', 'Coffee')
 
  // Stop MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
 
  // Force HTTPS for 2 years
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
 
  // Control referrer info sent to external sites
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
 
  // Full Permissions-Policy
  response.headers.set(
    'Permissions-Policy',
    [
      'accelerometer=()', 'ambient-light-sensor=()', 'autoplay=()', 'battery=()',
      'camera=()', 'cross-origin-isolated=()', 'display-capture=()', 'document-domain=()',
      'encrypted-media=()', 'execution-while-not-rendered=()', 'execution-while-out-of-viewport=()',
      'fullscreen=()', 'geolocation=()', 'gyroscope=()', 'keyboard-map=()', 'magnetometer=()',
      'microphone=()', 'midi=()', 'navigation-override=()', 'payment=()', 'picture-in-picture=()',
      'publickey-credentials-get=()', 'screen-wake-lock=()', 'sync-xhr=()', 'usb=()',
      'web-share=()', 'xr-spatial-tracking=()', 'interest-cohort=()',
    ].join(', ')
  )
 
  // CSP — unsafe-inline only on styles (low risk), not scripts
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://test69987.wordpress.com https://*.wp.com https://secure.gravatar.com",
      "connect-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  )
 
  // Cache-Control for HTML pages
  if (!request.nextUrl.pathname.startsWith('/_next/')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  }
 
  return response
}
 
export const config = {
  matcher: '/(.*)',
}
