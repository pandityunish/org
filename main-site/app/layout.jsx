import MainNavbar from '@/modules/ui/MainNavbar'
import './globals.css'
import { Inter } from 'next/font/google'
import MainFooter from '@/modules/ui/MainFooter'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">

      <body className={inter.className}>
        <MainNavbar />
        {children}
        <MainFooter />
      </body>
    </html>
  )
}
