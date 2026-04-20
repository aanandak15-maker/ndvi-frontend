import './globals.css'

export const metadata = {
  title: 'NDVI.AI - Advanced Crop Health Intelligence',
  description: 'Transform RGB satellite imagery into professional NDVI crop health maps using deep learning. Trained on 2,200 Sentinel-2 image pairs.',
  keywords: 'NDVI, crop health, satellite imagery, agriculture, AI, deep learning, precision farming',
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
