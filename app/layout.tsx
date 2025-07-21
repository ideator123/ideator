import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ideator Events',
  description: 'Designing Remarkable Events Across the Globe',
  generator: 'Ideator Events',
  openGraph: {
    title: 'Ideator Events',
    description: 'Designing Remarkable Events Across the Globe',
    type: 'website',
    locale: 'en_US',
    url: 'https://ideator.events',
    siteName: 'Ideator Events',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-serif bg-[#efede7] text-[#0a2449]">{children}</body>
    </html>
  )
}
