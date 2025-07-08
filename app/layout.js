import './globals.css'

export const metadata = {
  title: 'Cubit Packaging - Eco-Smart Custom Packaging Solutions',
  description: 'Beautiful, sustainable boxes, mailers & pouches. Fast U.S. production, low minimums, free design support.',
  keywords: 'custom packaging, eco-friendly packaging, smart packaging, QR codes, NFC, sustainable packaging',
  authors: [{ name: 'Cubit Packaging' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icon.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          async
          defer
        />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
} 