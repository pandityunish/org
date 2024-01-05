'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axiosInstance from '@/modules/axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function ResetPassword () {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async data => {
    try {
      const response = await axiosInstance.patch('/user/reset-password/', data)

      if (response.status === 200) {
        toast.success('Password reset successful. Please login.')
        router.push('/login')
      }
    } catch (error) {
      toast.error('Password reset failed. Please try again.')
    }
  }

  return (
    <div className='grid px-5 py-2 mx-auto lg:px-32 md:grid-cols-2 max-w-9xl'>
      <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 sm:py-16 lg:py-24'>
        <div className='xl:w-full xl:max-w-md 2xl:max-w-xl'>
          <h2 className='text-2xl font-bold leading-tight text-black sm:text-4xl'>
            Epass Reset Password
          </h2>
          <p className='mt-2 text-base text-gray-600'>
            Already have an account?{' '}
            <Link href='/login' className='text-epassblue'>
              Login
            </Link>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
            <div className='space-y-5'>
              <div>
                <label
                  htmlFor='mobileNumber'
                  className='text-base font-medium text-gray-900'
                >
                  Mobile Number
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    placeholder='Enter Mobile Number'
                    className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    {...register('mobile_number', {
                      required: true,
                      pattern: /^[0-9]{10}$/ // Basic pattern for a 10-digit mobile number
                    })}
                  />
                  {errors.mobileNumber && (
                    <span className='text-red-500'>
                      Valid mobile number is required
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor='newPassword'
                  className='text-base font-medium text-gray-900'
                >
                  New Password
                </label>
                <div className='mt-2.5'>
                  <input
                    type='password'
                    placeholder='Enter New Password'
                    className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                    {...register('new_password', { required: true })}
                  />
                  {errors.newPassword && (
                    <span className='text-red-500'>
                      New Password is required
                    </span>
                  )}
                </div>
              </div>

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
                  Reset Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
