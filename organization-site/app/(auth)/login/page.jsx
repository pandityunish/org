'use client'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/modules/axios'
import { useState } from 'react'

const Page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const storedPassword =
    typeof window !== 'undefined' ? localStorage.getItem('password') : ''

  const [password, setPassword] = useState(storedPassword || '')
  const [isloading, setisloading] = useState(false)
  const onLoginSubmit = async data => {
    try {
      setisloading(true)
      const response = await axiosInstance.post('/user/login/', data);
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access)
        localStorage.setItem('refresh', response.data.refresh)
        toast.success('Logged in Successfully')
         router.push('/dash',{scroll:false})
          // setisloading(false);
    
         
      } else {
        setisloading(false);
        toast.error('Login Failed, check your credentials')
      }
    } catch (error) {
      setisloading(false);
      console.log(error)
      toast.error('Please try again. Check your credentials')
    }
  }

  return (
    <>
      <div className='grid px-5 py-2 mx-auto md:grid-cols-2 max-w-9xl lg:px-32'>
        <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 sm:py-16 lg:py-24'>
          <div className='xl:w-full xl:max-w-sm 2xl:max-w-md'>
            <h2 className='text-3xl font-bold leading-tight text-black sm:text-4xl'>
              Sign in to Epass
            </h2>
            <p className='mt-2 text-base text-gray-600'>
              Don&apos;t have an account?
              <Link
                href='/register'
                title='Create free account at epass'
                className='ml-1 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
              >
                Create a free account
              </Link>
            </p>
            <form
              onSubmit={handleSubmit(onLoginSubmit)}
              method='POST'
              className='mt-8'
            >
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor='mobile_number'
                    className='text-base font-medium text-gray-900'
                  >
                    Mobile number
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='tel'
                      {...register('mobile_number', {
                        required: 'Mobile number is required'
                      })}
                      placeholder='Enter mobile number to get started'
                      className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.mobile_number ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.mobile_number && (
                      <p className='mt-1 text-red-500'>
                        {errors.mobile_number.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className='flex items-center justify-between'>
                    <label
                      htmlFor='password'
                      className='text-base font-medium text-gray-900'
                    >
                      Password
                    </label>
                    <Link
                      href='/forgot'
                      title='forgot password'
                      className='text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className='mt-2.5'>
                    <input
                      type='password'
                      {...register('password', {
                        value: password,
                        onChange: e => setPassword(e.target.value),
                        required: 'Password is required'
                      })}
                      placeholder='Enter your password'
                      className={`block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600 ${errors.password ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.password && (
                      <p className='mt-1 text-red-500'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className='flex items-center font-bold text-gray-500'
                    htmlFor='remember'
                  >
                    <input
                      className='ml-2 leading-tight'
                      type='checkbox'
                      id='remember'
                      name='remember'
                    />
                    <span className='ml-1 text-sm'>Remember me</span>
                  </label>
                </div>

                <div>
                  <button
                    type='submit'
                    className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                  >
                    {isloading===false?"Log in":"Loading"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='flex items-center justify-end px-4 py-10 border-l sm:py-16 lg:py-24'>
          <div>
            <Image
              width={500}
              height={500}
              className='w-full mx-auto'
              src='/qr-scanning.svg'
              alt='qr-scanning'
            />
            <div className='w-full mx-auto mt-5 xl:max-w-xl'>
              <h3 className='text-2xl font-bold text-center text-black'>
                Get Your Own QR
              </h3>
              <p className='leading-relaxed text-center text-gray-500 mt-2.5 text-xs'>
                Epass revolutionizes the entry management system with QR
                technology. Say goodbye to paperwork and hello to a seamless
                digital entry experience. Register your organization today and
                join the paperless future of efficient entry management.
              </p>
              <div className='flex items-center justify-center mt-10 space-x-3'>
                <div className='bg-orange-500 rounded-full w-20 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
                <div className='bg-gray-200 rounded-full w-12 h-1.5' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
