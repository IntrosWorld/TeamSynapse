import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TeamSynapse | Offline AI for Rural Empowerment',
  description: 'Meet the team behind India\'s first offline farmer-query LLM',
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
