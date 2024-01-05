import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { Poppins } from 'next/font/google'

import { ToastContainer } from 'react-toastify'

import ThemeRegistry from './ThemeRegistry'
import Providers from './Providers'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin']
})

export const metadata = {
  title: 'Epass: Organizaiton',
  description: 'Epass Organization Application'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>
          <div className='flex justify-between w-full'>
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='dark'
            />
            <section className='w-full'>
              <ThemeRegistry options={{ key: 'mui' }}>
                <main className='px-0 m-0 md:px-0'>{children}</main>
              </ThemeRegistry>
            </section>
          </div>
        </Providers>
      </body>
    </html>
  )
}
