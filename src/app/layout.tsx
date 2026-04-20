import './globals.css'

export const metadata = {
  title: 'NDVI Crop Health Analysis',
  description: 'AI-powered crop health monitoring using NDVI analysis',
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
