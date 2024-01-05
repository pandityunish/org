'use client'

import axiosInstance from '@/modules/axios'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import { useUserData } from '@/modules/hooks/useUserData'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()

  const [approveVisitorBeforeAccess, setApproveVisitorBeforeAccess] = useState(
    (user && user.approve_visitor_before_access) || false
  )

  const [checkInCheckOutFeature, setCheckInCheckOutFeature] = useState(
    (user && user.check_in_check_out_feature) || false
  )
  useEffect(() => {
    console.log(approveVisitorBeforeAccess, checkInCheckOutFeature);
  }, [approveVisitorBeforeAccess, checkInCheckOutFeature]);

  if (isUserLoading) return <LoadingComponent />


  const handleSettingChange = async (settingName, value) => {
    if (settingName === "approveVisitorBeforeAccess") {
      setApproveVisitorBeforeAccess(value);
    } else if (settingName === "checkInCheckOutFeature") {
      setCheckInCheckOutFeature(value);
    }

    try {
      const res = await axiosInstance.post(
        "/organization/settings/",
        {
          approve_visitor_before_access:
            settingName === "approveVisitorBeforeAccess"
              ? value
              : approveVisitorBeforeAccess,
          check_in_check_out_feature:
            settingName === "checkInCheckOutFeature"
              ? value
              : checkInCheckOutFeature,
        },
        {
          headers: {
            Authorization: `Bearer ${typeof window !== "undefined"
              ? localStorage?.getItem("access")
              : ""
              }`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Settings Updated");
      }
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  return (
    <div className='w-full py-4 mx-auto'>
      <h1 className='mb-4 text-2xl font-semibold'>Settings</h1>
      <div className='mb-4'>
        <label className='block mb-2 text-lg'>
          Approve Visitor Before Access
        </label>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={approveVisitorBeforeAccess}
            onChange={e =>
              handleSettingChange(
                'approveVisitorBeforeAccess',
                e.target.checked
              )
            }
            className='mr-2'
          />
          <span className='text-gray-700'>Enable this feature</span>
        </div>
      </div>
      <div className='mb-4'>
        <label className='block mb-2 text-lg'>Check-In/Check-Out Feature</label>
        <div className='flex items-center'>
          <input
            type='checkbox'
            checked={checkInCheckOutFeature}
            onChange={e =>
              handleSettingChange('checkInCheckOutFeature', e.target.checked)
            }
            className='mr-2'
          />
          <span className='text-gray-700'>Enable this feature</span>
        </div>
      </div>
    </div>
  )
}

export default Page
