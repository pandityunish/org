'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useForm,SubmitHandler  } from 'react-hook-form'
import {
  organizationNatureTypes,
  organizationTypes
} from '@/modules/data/organization_types_nature'
import { userDataAtom } from '@/jotai/dash-atoms'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/modules/axios'

export default function Register () {
  const router = useRouter()
  const [userData, setUserData] = useAtom(userDataAtom)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm()

  const onRegisterSubmit = async data => {
    console.log(data)
    try {
     
      const orgnaization_registration_data = {
        ...data,
        is_organization: true,
        full_name: data.organization_name
      }
      console.log(orgnaization_registration_data);
      const response = await axiosInstance.post(
        '/user/register/',
        orgnaization_registration_data
      )
     
    
      console.log(response.data)
      if (response.status === 201) {
        console.log(response, response.status)
        setUserData({ ...response.data })
        toast.success('Welcome, Successfully Registered')
        router.push('/verify')
      }
      else{
        const data=response.data;
        console.log(data)
        toast.error('Registration Failed, Try Again')
      }
    } catch (error) {
      console.log(error.response)
      if(error.response.status===500 ||error.response.status===404){
        toast.error('Registration Failed, Try Again')
      }else{
        if (error && Object.values(error?.response?.data || []).length >= 1) {
          Object.values(error?.response?.data).map(e =>
            toast.error(e[0].charAt(0).toUpperCase() + e[0].slice(1))
          )
        } else {
          toast.error('Registration Failed, Try Again')
        }
      }
      
    }
  }

  return (
    <>
      <div className='grid px-5 py-2 mx-auto lg:px-32 md:grid-cols-2 max-w-9xl'>
        <div className='flex items-center justify-start px-4 py-10 bg-white md:px-0 sm:py-16 lg:py-24'>
          <div className='xl:w-full xl:max-w-sm 2xl:max-w-xl'>
            <h2 className='text-2xl font-bold leading-tight text-black sm:text-4xl'>
              Register Organization to Epass
            </h2>
            <p className='mt-2 text-base text-gray-600'>
              Already have an account?
              <Link
                href='/login'
                title='login now'
                className='px-2 font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700'
              >
                Login now
              </Link>
            </p>
            <form 
            onSubmit={handleSubmit(onRegisterSubmit)} 
            className='mt-6'>
              <div className='space-y-5'>
                <div>
                  <label
                    htmlFor='organization_name'
                    className='text-base font-medium text-gray-900'
                  >
                    Organization Name
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      placeholder='Enter Organization Name'
                      className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      {...register('organization_name', { required: true })}
                    />
                    {errors.organization_name && (
                      <span className='text-red-500'>
                        Organization name is required
                      </span>
                    )}
                  </div>
                </div>
                <div className='grid w-full grid-cols-2 gap-2'>
                  <section>
                    <label
                      htmlFor='organization_type'
                      className='text-base font-medium text-gray-900'
                    >
                      Type of Organisation
                    </label>
                    <div className='mt-2.5'>
                      <select
                        className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                        {...register('organization_type', { required: true })}
                      >
                        {organizationTypes.map(org => (
                          <option key={org.id} value={org.value}>
                            {org.title}
                          </option>
                        ))}
                      </select>
                      {errors.organization_type && (
                        <span className='text-red-500'>
                          Please select organization type
                        </span>
                      )}
                    </div>
                  </section>
                  <section>
                    <label
                      htmlFor='organization_type'
                      className='text-base font-medium text-gray-900'
                    >
                      Nature of Organisation
                    </label>
                    <div className='mt-2.5'>
                      <select
                        className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                        {...register('organization_nature', { required: true })}
                      >
                        {organizationNatureTypes.map(org => (
                          <option key={org.id} value={org.value}>
                            {org.title}
                          </option>
                        ))}
                      </select>
                      {errors.organization_type && (
                        <span className='text-red-500'>
                          Please select organization type
                        </span>
                      )}
                    </div>
                  </section>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='text-base font-medium text-gray-900'
                  >
                    E-mail
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='email'
                      placeholder='Enter E-mail'
                      className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      {...register('email', { required: true })}
                    />
                    {errors.email && (
                      <span className='text-red-500'>Email is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='mobile_number'
                    className='text-base font-medium text-gray-900'
                  >
                    Mobile Number
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='tel'
                      placeholder='Enter Mobile Number to get started'
                      className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      {...register('mobile_number', { required: true })}
                    />
                    {errors.mobile_number && (
                      <span className='text-red-500'>
                        Mobile number is required
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='address'
                    className='text-base font-medium text-gray-900'
                  >
                    Address
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='text'
                      placeholder='Enter Address to get started'
                      className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      {...register('address', { required: true })}
                    />
                    {errors.address && (
                      <span className='text-red-500'>
                       Address is required
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='text-base font-medium text-gray-900'
                  >
                    Password
                  </label>
                  <div className='mt-2.5'>
                    <input
                      type='password'
                      placeholder='Enter your password'
                      className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      {...register('password', { required: true })}
                    />
                    {errors.password && (
                      <span className='text-red-500'>Password is required</span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='confirm_password'
                    className='text-base font-medium text-gray-900'
                  >
                    Confirm Password
                  </label>
                  <div className='mt-2.5' >
                    <input
                      type='password'
                      placeholder='Confirm your password'
                      className='block w-full p-3 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600'
                      {...register('confirm_password', {
                        required: true,
                        validate: value => value === watch('password')
                      })}
                    />
                    {errors.confirm_password && (
                      <span className='text-red-500'>Passwords must match</span>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    type='submit'
                    
                    className='inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-epassblue focus:outline-none hover:bg-blue-700 focus:bg-blue-700'
                   
                  >
                    Register
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
                Revolutionize your organization&apos;s entry management with
                Epass, where QR technology paves the way for a paperless future.
                Leave behind the clutter of paperwork and embrace the simplicity
                of a digital entry experience. Register today and be part of the
                wave of change in entry management.
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
