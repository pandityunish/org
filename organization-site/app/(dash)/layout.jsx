'use client'

import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { useUserData } from '@/modules/hooks/useUserData'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import MainNavbar from '@/modules/core-ui/MainNavbar'
import LeftSidebar from '@/modules/core-ui/LeftSidebar'
import RightSidebar from '@/modules/core-ui/RightSidebar'

export default function DashboardLayout ({ children }) {
  const router = useRouter()
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

  useEffect(() => {
    if (!isUserLoading) {
      if (isUserError) {
        router.push('/login')
      } else if (!user?.is_kyc_verified) {
        router.push('/verify-kyc')
      }
    }
  }, [isUserLoading, isUserError, user?.is_kyc_verified, router])

  if (isUserLoading || isUserError) {
    return <LoadingComponent />
  }

  if (!isUserLoading && !isUserError && !user?.is_organization) {
    return redirect('/login')
  }

  return (
    <div className='flex justify-between w-full'>
      <LeftSidebar />
      <section className='w-full'>
        <MainNavbar />
        <main className='px-5 my-1 sm:px-10 md:px-16'>{children}</main>
      </section>
      <RightSidebar />
    </div>
  )
}
