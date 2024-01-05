'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { redirect } from 'next/navigation'
import axiosInstance from '@/modules/axios'
import { useUserData } from '@/modules/hooks/useUserData'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'

function VerifyKycForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const router = useRouter()
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

  if (!isUserLoading && user?.is_kyc_verified == true) {
    return redirect('/dash')
  }

  const onSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('establishment_year', data.establishment_year)
      formData.append('vat_number', data.vat_number)
      formData.append('pan_number', data.pan_number)
      formData.append('registration_number', data.registration_number)
      formData.append('country', data.country)
      formData.append('state', data.state)
      formData.append('district', data.district)
      formData.append('municipality', data.municipality)
      formData.append('city_village_area', data.city_village_area)
      formData.append('ward_no', data.ward_no)
      formData.append('organization_summary', data.organization_summary)
      formData.append('whatsapp_viber_number', data.whatsapp_viber_number)
      formData.append('secondary_number', data.secondary_number)
      formData.append('telephone_number', data.telephone_number)
      formData.append('website', data.website)
      formData.append('logo', data.logo[0])
      formData.append('organization', user.id)
      const orgnaization_data = {
        ...data,
        organization: user.id,
        logo:data.logo[0]
      }
      console.log(data.logo)
      const response = await axiosInstance.post(
        '/organization/verify-kyc/',
        orgnaization_data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${typeof window !== 'undefined'
                ? localStorage?.getItem('access')
                : ''
              }`
          }
        }
      );
      console.log(response)
      if (response.status === 201) {
        toast.success('KYC Verification Successfull')
        router.push('/dash')
      }else{
        toast.error('KYC Verification failed, Try Again')
      }
    } catch (error) {
      if(error.response.status===500 ||error.response.status===404){
        toast.error('KYC Verification failed, Try Again')
      }else{
        if (error && Object.values(error?.response?.data || []).length >= 1) {
          Object.values(error?.response?.data).map(e =>
            toast.error(e[0].charAt(0).toUpperCase() + e[0].slice(1))
          )
        } else {
          toast.error('KYC Verification failed, Try Again')
        }
      }
      console.error('Error submitting KYC data:', error)
    }
  }

  return (
    <>
      {isUserLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className='w-full bg-gray-50'>
            <div className='p-6 mx-auto rounded-md bg-gray-50 max-w-7xl'>
              <h2 className='text-epassblue'>
                Please Verify Your Organization KYC to continue.
              </h2>
              <h2 className='mb-4 text-2xl font-semibold'>
                Organization KYC Form
              </h2>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='grid grid-cols-3 gap-4'
                encType='multipart/form-data'
              >
                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='establishment_year'
                    className='block font-medium text-gray-700'
                  >
                    Establishment Year
                  </label>
                  <input
                    type='number'
                    id='establishment_year'
                    {...register('establishment_year', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.establishment_year && (
                    <span className='text-red-500'>
                      Establishment year is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='vat_number'
                    className='block font-medium text-gray-700'
                  >
                    VAT Number
                  </label>
                  <input
                    type='text'
                    id='vat_number'
                    {...register('vat_number', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.vat_number && (
                    <span className='text-red-500'>VAT number is required</span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='pan_number'
                    className='block font-medium text-gray-700'
                  >
                    PAN Number
                  </label>
                  <input
                    type='text'
                    id='pan_number'
                    {...register('pan_number', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.pan_number && (
                    <span className='text-red-500'>PAN number is required</span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='registration_number'
                    className='block font-medium text-gray-700'
                  >
                    Registration Number
                  </label>
                  <input
                    type='text'
                    id='registration_number'
                    {...register('registration_number', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.registration_number && (
                    <span className='text-red-500'>
                      Registration number is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='country'
                    className='block font-medium text-gray-700'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    id='country'
                    {...register('country', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.country && (
                    <span className='text-red-500'>Country is required</span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='state'
                    className='block font-medium text-gray-700'
                  >
                    State
                  </label>
                  <input
                    type='text'
                    id='state'
                    {...register('state', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.state && (
                    <span className='text-red-500'>State is required</span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='district'
                    className='block font-medium text-gray-700'
                  >
                    District
                  </label>
                  <input
                    type='text'
                    id='district'
                    {...register('district', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.district && (
                    <span className='text-red-500'>District is required</span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='municipality'
                    className='block font-medium text-gray-700'
                  >
                    Municipality
                  </label>
                  <input
                    type='text'
                    id='municipality'
                    {...register('municipality', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.municipality && (
                    <span className='text-red-500'>
                      Municipality is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='city_village_area'
                    className='block font-medium text-gray-700'
                  >
                    City/Village/Area
                  </label>
                  <input
                    type='text'
                    id='city_village_area'
                    {...register('city_village_area', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.city_village_area && (
                    <span className='text-red-500'>
                      City/Village/Area is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='ward_no'
                    className='block font-medium text-gray-700'
                  >
                    Ward No
                  </label>
                  
                  <input
                    type='text'
                    id='ward_no'
                    {...register('ward_no',{ required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.ward_no && (
                    <span className='text-red-500'>
                      Ward No is required
                    </span>
                  )}
                </div>

                <div className='col-span-3 mb-4'>
                  <label
                    htmlFor='organization_summary'
                    className='block font-medium text-gray-700'
                  >
                    Organization Summary
                  </label>
                  <textarea
                    id='organization_summary'
                    {...register('organization_summary', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.organization_summary && (
                    <span className='text-red-500'>
                      Organization summary is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='whatsapp_viber_number'
                    className='block font-medium text-gray-700'
                  >
                    WhatsApp/Viber Number
                  </label>
                  <input
                    type='text'
                    id='whatsapp_viber_number'
                    {...register('whatsapp_viber_number', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.whatsapp_viber_number && (
                    <span className='text-red-500'>
                      WhatsApp/Viber number is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='secondary_number'
                    className='block font-medium text-gray-700'
                  >
                    Secondary Number
                  </label>
                  <input
                    type='text'
                    id='secondary_number'
                    {...register('secondary_number', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.secondary_number && (
                    <span className='text-red-500'>
                      Secondary number is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='telephone_number'
                    className='block font-medium text-gray-700'
                  >
                    Telephone Number
                  </label>
                  <input
                    type='text'
                    id='telephone_number'
                    {...register('telephone_number',{ required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                       {errors.telephone_number && (
                    <span className='text-red-500'>
                      Telephone number is required
                    </span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='website'
                    className='block font-medium text-gray-700'
                  >
                    Website
                  </label>
                  <input
                    type='url'
                    id='website'
                    {...register('website', { required: true })}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                  {errors.website && (
                    <span className='text-red-500'>Website is required</span>
                  )}
                </div>

                <div className='col-span-1 mb-4'>
                  <label
                    htmlFor='logo'
                    className='block font-medium text-gray-700'
                  >
                    Logo (Upload)
                  </label>
                  <input
                    type='file'
                    id='logo'
                    {...register('logo')}
                    className='w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                  />
                </div>

                <div className='col-span-3 mb-4'>
                  <button
                    type='submit'
                    className='w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none'
                  >
                    Submit KYC
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default VerifyKycForm
