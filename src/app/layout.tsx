import './globals.css'
import type { Metadata } from 'next'

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
    <html className="h-full" lang="en">
      <body className="h-full">
        <nav className="bg-blue-500 p-4  h-[74px]">
          <div className="container mx-auto">
              <div className="flex justify-between items-center">
                  <a href="#" className="text-white text-2xl font-semibold">Waterdeep Times</a>
                  <ul className="flex space-x-4">
                      <li><a href="#" className="text-white hover:text-gray-300">Login</a></li>
                  </ul>
              </div>
          </div>
        </nav>
        <div className="h-[calc(100vh-74px)]">
          {children}
        </div>
      </body>
    </html>
  )
}
