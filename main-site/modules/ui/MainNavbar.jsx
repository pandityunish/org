import Link from 'next/link'

const navLinks = [
  { text: 'Home', href: '/' },
  { text: 'Contact', href: '/contact' },
  { text: 'Download', href: '/download' },
  { text: 'About Us', href: '/about-us' },
  { text: 'Docs', href: 'docs' }
]

export default function MainNavbar () {
  return (
    <header className='pb-6 bg-white lg:pb-0'>
      <div className='px-4 mx-auto max-w-9xl sm:px-6 lg:px-0'>
        <nav className='flex items-center justify-between h-16 lg:h-14'>
          <div className='flex-shrink-0'>
            <Link href='/' title className='flex'>
              <img className='w-auto h-6 lg:h-8' src='/logo.svg' alt='' />
            </Link>
          </div>
          <button
            type='button'
            className='inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100'
          >
            <svg
              className='block w-6 h-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 8h16M4 16h16'
              />
            </svg>
            <svg
              className='hidden w-6 h-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <div className='hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10'>
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                title
                className='text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
              >
                {link.text}
              </a>
            ))}
          </div>
          <Link
            href='/register'
            title
            className='items-center justify-center hidden px-3 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700'
            role='button'
          >
            Get started now
          </Link>
        </nav>
        <nav className='pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden'>
          <div className='flow-root'>
            <div className='flex flex-col px-6 -my-2 space-y-1'>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  title
                  className='inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600'
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
          <div className='px-6 mt-6'>
            <a
              href='#'
              title
              className='inline-flex justify-center px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700'
              role='button'
            >
              Get started now
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
