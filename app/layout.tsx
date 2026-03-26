import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jasmine Simmonds — Security Consultant',
  description: 'Penetration tester delivering security assessments across web apps, APIs, and infrastructure.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
