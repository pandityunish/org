'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Link from 'next/link'
import axiosInstance from '@/modules/axios'
import { useRouter } from 'next/navigation'
import { userDataAtom } from '@/jotai/dash-atoms'
import { useAtom } from 'jotai'

function VerifyOTP () {
  const router = useRouter()
  const [userData, setUserData] = useAtom(userDataAtom)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    try {
      const payload = { ...data, mobile_number: userData.mobile_number }
      const response = await axiosInstance.post('/user/verify-otp/', payload)

      if (response.status === 200) {
        toast.success('Verification successful. Please login.')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.')
    }
  }

  const handleResendOTP = async () => {
    try {
      const response = await axiosInstance.post('/user/resend-otp', {
        mobile_number
      })

      if (response.status === 200) {
        toast.success('Verification successful. Please login.')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.')
    }
  }

  return (
    <div className='grid px-5 py-2 mx-auto lg:px-32 md:grid-cols-2 max-w-9xl'>
      <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 sm:py-16 lg:py-24'>
        <div className='xl:w-full xl:max-w-sm 2xl:max-w-xl'>
          <h2 className='text-2xl font-bold leading-tight text-black sm:text-4xl'>
            Verify OTP
          </h2>
          <p className='mt-2 text-base text-gray-600'>
            Already have an account?{' '}
            <Link
              href='/login'
              title='login now'
              className='px-2 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
            >
              Login now
            </Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <div className='space-y-5'>
              <div>
                <label
                  htmlFor='otp'
                  className='text-base font-medium text-gray-900'
                >
                  OTP
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    placeholder='Enter OTP'
                    className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    {...register('otp', { required: true })}
                  />
                  {errors.otp && (
                    <span className='text-red-500'>OTP is required</span>
                  )}
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                >
                  Verify OTP
                </button>
              </div>
              <div>
                <p className='text-base text-gray-600'>
                  Didn&apos;t receive OTP?{' '}
                  <button
                    title='Resend OTP'
                    onClick={handleResendOTP}
                    className='px-2 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
                  >
                    Resend OTP
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTP
