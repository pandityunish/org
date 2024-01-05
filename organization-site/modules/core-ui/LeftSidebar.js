'use client'
import { useAtom } from 'jotai'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { showLeftSidebarAtom } from '@/jotai/ui-atoms'
import { useUserData } from '@/modules/hooks/useUserData'
import { GrOverview } from 'react-icons/gr'
import { GiTreeBranch } from 'react-icons/gi'
import { TbCircleFilled } from 'react-icons/tb'
import { FcSettings } from 'react-icons/fc'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

import { MdOutlineClose } from 'react-icons/md'
import { BsClockHistory } from 'react-icons/bs'
import { BiDockTop } from 'react-icons/bi'
import { useQuery } from '@tanstack/react-query'

import {
  FaArrowsDownToPeople,
  FaClipboardList,
  FaMessage
} from 'react-icons/fa6'

import Image from 'next/image'
import axiosInstance from '../axios'

const mainMenu = [
  { id: 1, menu: 'Scan Now', path: '/scan' },
  { id: 2, menu: 'Current Visitors', path: '/scan' },
  { id: 3, menu: 'Manual Entry', path: '/manual-entry' }
]

const menuList = [
  { id: 1, menu: 'Overview', path: '/dash', icon: GrOverview },
  { id: 7, menu: 'History', path: '/histories', icon: BsClockHistory },
  { id: 2, menu: 'Visitors', path: '/visitors', icon: FaArrowsDownToPeople },
  { id: 4, menu: 'Notice', path: '/notifications', icon: FaClipboardList },
  { id: 5, menu: 'Messages', path: '/message', icon: FaMessage },
  { id: 6, menu: 'Branches', path: '/branch', icon: GiTreeBranch }
  // { id: 3, menu: 'Staff', path: '/staff', icon: FaPeopleArrows }
]

const LeftSidebar = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
const [ishistoryexpanded, setishistoryexpanded] = useState(false);
const [kycData, setKycData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchKYCData = async () => {
    try {
      const response = await axiosInstance.get('/organization/kyc/me', {
        headers: {
          Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage?.getItem('access') : ''}`
        }
      });
      setKycData(response.data);
    } catch (error) {
      console.error('Error fetching KYC data:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchKYCData(); // Initial data fetch

  // You can add dependencies to the dependency array if you want to re-fetch data based on certain changes
}, []);

  
  
  const router = useRouter()
  const [showLeftSidebar, setShowLeftSidebar] = useAtom(showLeftSidebarAtom)

  return (
    <AnimatePresence>
      {showLeftSidebar && (
        <motion.section
          className='min-w-[13%] w-54 border-r overflow-y-auto  fixed top-0 bg-white z-10 h-screen origin-top-right px-4'
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.2 }}
          style={{
           
           
           
           
          }}
        >
          <div className='flex justify-between mt-3 mb-6 px-0.5 '>
            <section className='flex items-center justify-center'>
           {kycData?.logo===null?<div><Image  alt='LO'
                src={
                  '/user-avatar.png'
                }
                height={28}
                width={28}
                className='p-1 shadow border-b-1'/></div>:<Image
                alt='LO'
                src={
                  !isUserLoading && user.is_kyc_verified && !isKycLoading && kycData?.logo!==undefined
                    ? `https://api.epass.com.np${kycData?.logo}`
                    : '/user-avatar.png'
                }
                height={28}
                width={28}
                className='p-1 shadow border-b-1'
              />}   
              <div className='flex-row px-2 '>
                <h1 className='text-base font-semibold '>
                  {user?.organization_name}
                </h1>
                <h2 className='text-[0.6rem] -mt-1'>{user?.mobile_number}</h2>
              </div>
            </section>
            <section
              className='flex items-start justify-end'
              onClick={() => setShowLeftSidebar(false)}
            >
              <MdOutlineClose
                size={25}
                className='mx-2 font-bold cursor-pointer text-epassblue hover:text-red-600'
              />
            </section>
          </div>
          <ul className='grid gap-4 my-2 ml-1 text-sm cursor-pointer '>
            <Link href={'/dash'} passHref>
              <span
                className={`flex items-center ${router.pathname === '/dash' ? 'active-link' : ''
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>Overview</span>
              </span>
            </Link>

            <Link
              href={`https://api.epass.com.np${user.qr === null ? 'images' : user.qr
                }`}
              passHref
              target='_blank'
              title='View your Epass QR Code'
            >
              <span
                className={`flex items-center ${router.pathname === '/my-qr' ? 'text-epassblue underline' : ''
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>MyQR</span>
              </span>
            </Link>
            <Link href={'/manual-entry'} passHref>
              <span
                className={`flex items-center ${router.pathname === '/manual-entry' ? 'text-epassblue underline' : ''
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>Manual Entry</span>
              </span>
            </Link>

            <Link href={'/waiting-visitors'} passHref>
              <span
                className={`flex items-center ${router.pathname === '/waiting-visitors' ? 'text-epassblue underline' : ''
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>Waiting Visitors</span>
              </span>
            </Link>
          </ul>
          <hr className='h-px my-3 bg-transparent border-t-0 opacity-25 bg-gradient-to-br from-transparent via-neutral-500 to-transparent dark:opacity-100' />
          <h1 className='py-1 text-sm text-gray-400'>Menus</h1>
          <motion.ul className='grid gap-1.5 ml-3 cursor-pointer '>
            {menuList?.map(mn => (
              <li
                key={mn.id}
                className={`flex items-center my-1 text-sm font-medium hover:text-epassblue ${router.pathname === mn.path ? 'active-link' : ''
                  }`}
              >
                {mn.icon && <mn.icon className='text-epassblue' size='17' />}
                <Link
                  href={mn.path}
                  passHref
                  onClick={() => setShowLeftSidebar(false)}
                >
                  <span className='px-2'>{mn.menu}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
          <hr className='h-px my-3 bg-transparent border-t-0 opacity-25 bg-gradient-to-br from-transparent via-neutral-500 to-transparent dark:opacity-100' />
          <h1 className='py-1 text-sm text-gray-400'>Configuration</h1>
          <div className='my-2 space-y-2'>
            <section onClick={() => setShowLeftSidebar(false)}>
              <Link
                href='/kyc'
                className='flex items-center px-3 hover:text-epassblue '
              >
                <span className='flex items-center'>
                  <BiDockTop className='text-epassblue' size='17' />
                  <span className='px-2 text-sm font-medium'>KYC</span>
                </span>
              </Link>
            </section>
            <section onClick={() => setShowLeftSidebar(false)}>
              <Link
                href='/settings'
                className='flex items-center px-3 hover:text-epassblue '
              >
                <span className='flex items-center'>
                  <FcSettings className='text-epassblue' size='17' />
                  <span className='px-2 text-sm font-medium'>Settings</span>
                </span>
              </Link>
            </section>
          </div>
          <hr className='h-px my-3 bg-transparent border-t-0 opacity-25 bg-gradient-to-br from-transparent via-neutral-500 to-transparent dark:opacity-100' />
          <div className='flex items-center justify-between cursor-pointer' onClick={()=>{
            setishistoryexpanded(!ishistoryexpanded)
          }}>
          <h1 className='py-1 text-sm text-gray-400 '>History / Report</h1>
          
{ishistoryexpanded?
  <IoIosArrowUp/>:
<IoIosArrowDown/>
}
          </div>
          {ishistoryexpanded===false?<div></div>:<motion.section  initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: '0%' }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.2 }} className='transition-all'>
           
           
           <section onClick={() => setShowLeftSidebar(false)}>
               <Link
                 href='/settings'
                 className='flex items-center py-1 px-3 hover:text-epassblue '
               >
                 <span className='flex items-center'>
                   <FcSettings className='text-epassblue' size='17' />
                   <span className='px-2 text-sm font-medium'>View and search</span>
                 </span>
               </Link>
             </section>
             <section onClick={() => setShowLeftSidebar(false)}>
               <Link
                 href='/settings'
                 className='flex items-center py-1 px-3 hover:text-epassblue '
               >
                 <span className='flex items-center'>
                   <FcSettings className='text-epassblue' size='17' />
                   <span className='px-2 text-sm font-medium'>Total branch. </span>
                 </span>
               </Link>
             </section>
             <section onClick={() => setShowLeftSidebar(false)}>
               <Link
                 href='/settings'
                 className='flex items-center py-1 px-3 hover:text-epassblue '
               >
                 <span className='flex items-center'>
                   <FcSettings className='text-epassblue' size='17' />
                   <span className='px-2 text-sm font-medium'>Total visitors</span>
                 </span>
               </Link>
             </section>
             <section onClick={() => setShowLeftSidebar(false)}>
               <Link
                 href='/settings'
                 className='flex items-center px-3 py-1 hover:text-epassblue '
               >
                 <span className='flex items-center'>
                   <FcSettings className='text-epassblue' size='17' />
                   <span className='px-2 text-sm font-medium'>Total manual entry visitor</span>
                 </span>
               </Link>
             </section>
             <section onClick={() => setShowLeftSidebar(false)}>
               <Link
                 href='/settings'
                 className='flex items-center px-3 py-1 hover:text-epassblue '
               >
                 <span className='flex items-center'>
                   <FcSettings className='text-epassblue' size='17' />
                   <span className='px-2 text-sm font-medium'>View purpose of visit.</span>
                 </span>
               </Link>
             </section>
             
             </motion.section>}
             <ul className='grid gap-4 my-2 ml-1 text-sm mt-5 cursor-pointer '>
            <Link href={'/dash'} passHref>
              <span
                className={`flex items-center ${router.pathname === '/dash' ? 'active-link' : ''
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>About Us</span>
              </span>
            </Link>

            <Link
              href=""
              passHref
              target='_blank'
              title='View your Epass QR Code'
            >
              <span
                className={`flex items-center
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>Privacy Policy</span>
              </span>
            </Link>
            <Link href={'/manual-entry'} passHref>
              <span
                className={`flex items-center 
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>Terms and Condition</span>
              </span>
            </Link>

            <Link href={'/waiting-visitors'} passHref>
              <span
                className={`flex items-center 
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>FAQs</span>
              </span>
            </Link>
            <Link href={'/waiting-visitors'} passHref>
              <span
                className={`flex items-center 
                  }`}
              >
                <TbCircleFilled size='10' className='text-epassblue' />
                <span className='ml-1 font-semibold '>Security</span>
              </span>
            </Link>
          </ul>
          <div className=' my-3 text-sm'>
            <h1 className='text-xs'>2023@EpassNepal</h1>
            
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default LeftSidebar
