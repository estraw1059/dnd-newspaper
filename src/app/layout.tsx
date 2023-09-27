import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Waterdeep Times',
  description: 'Extra Extra! Get the waterdeep times here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto">
              <div className="flex justify-between items-center">
                  <a href="#" className="text-white text-2xl font-semibold">Waterdeep Times</a>
                  <ul className="flex space-x-4">
                      <li><a href="#" className="text-white hover:text-gray-300">Login</a></li>
                  </ul>
              </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
