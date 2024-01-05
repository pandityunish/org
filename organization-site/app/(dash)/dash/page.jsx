'use client'
import { useEffect, useState } from 'react'
import LoadingComponent from '@/modules/core-ui/LoadingComponent'
import axiosInstance from '@/modules/axios'
import { BiCurrentLocation } from 'react-icons/bi'
import { GiRotaryPhone } from 'react-icons/gi'
import InfoCard from '@/modules/core-ui/InfoCard'
import VisitorThisWeek from '@/modules/charts/VisitorThisWeek'
import HistoryTable from '@/modules/tables/HistoryTable'
import { useUserData } from '@/modules/hooks/useUserData'
import Image from 'next/image'

export default function Page () {
  const [visitHistoryData, setVisitHistoryData] = useState([])
  const [todayHistoryData, setTodayHistoryData] = useState([])
  const [waitingVisitor, setWaitingVisitor] = useState([])
  const [currentWeekData, setCurrentWeekData] = useState([])
  const [qrcode, setqrcode] = useState("")
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError
  } = useUserData()
   const getuserqrcode=async()=>{
    try {
      const res = await axiosInstance.get(
        `/user/qr-code/${user.id}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        }
      );
      if(res.status==200){
        // console.log(res.data);
        setqrcode(res.data);
        
      }
    } catch (error) {
      console.log(error)
    }
   }
  function filterDataForCurrentWeek (data) {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek)
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 7)
    endOfWeek.setHours(23, 59, 59, 999)

    const filteredData = data.filter(item => {
      const itemDate = new Date(item.visited_at)
      return itemDate >= startOfWeek && itemDate <= endOfWeek
    })

    return filteredData
  }

  useEffect(() => {
    ;(async () => {

      if (user !== undefined) {
        getuserqrcode();
        try {
          const res = await axiosInstance.get(
            `/organization/${user.id}/visit-history`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
              }
            }
          )
          const today = new Date().toISOString().split('T')[0]
          if (res.status == 200) {
            const todaysVisits = res.data.filter(item =>
              item.visited_at.startsWith(today)
            )
            const waitingVisits = res.data.filter(
              item => item.is_approved == false
            )
            setCurrentWeekData([...filterDataForCurrentWeek(res.data)])

            setWaitingVisitor([...waitingVisits])
            setVisitHistoryData([...res.data])
            setTodayHistoryData([...todaysVisits]);
            
          }
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [user])

  return (
    <div className='w-full'>
      {!isUserLoading ? (
        <>
       
          <div className='flex items-start justify-between'>
            <section>
              <article className='space-y-0.5'>
                <h1 className='text-lg font-bold'>{user?.organization_name}</h1>
                <span className='flex items-center text-epassblue'>
                  <span className='items-center justify-center '>
                    <BiCurrentLocation size={20} />
                  </span>
                  <h1 className='px-0.5 text-sm '>{user.address}</h1>
                </span>
                <span className='flex items-center text-epassblue'>
                  <span className='items-center justify-center '>
                    <GiRotaryPhone size={20} />
                  </span>
                  <h1 className='px-0.5 text-sm'>{user?.mobile_number}</h1>
                </span>
              </article>
            </section>
            
       
              
          
            <section className='flex m-2 '>
           
      <div className=" bg-white rounded-10 overflow-hidden flex flex-col items-center">
        <div className=" text-center text-black px-50px text-24px" >
          <img src="https://api.epass.com.np/media/logo/epass.png" alt="" className='h-8'/>
        </div>
        
          <div className=" text-center   border-[#197abe] border-[6px] rounded-lg p-4  mt-3">
            <p className=" font-bold  text-black">Scan the QR</p>
            <div>
            <img   
                src={
                  !isUserLoading || !isUserError || user.qr!==""
                    ? `https://api.epass.com.np${user?.qr}`
                    : '/user-avatar.png'
                } height={180}
                width={180}/>
            </div>
           
            <div className="terminal-no text-center mt-35px text-black">
              <p className="terminal-text text-black">Terminal No.</p>
              <p className="terminal-number font-bold text-black mt-12px">{user?.id}</p>
            </div>
          
          
        </div>
        <div className="footer text-center mt-5 px-10 ">
            <p className="font-bold text-2xl">{user?.organization_name}</p>
            <p className="">{user?.address}</p>
          </div>
      </div>
   
              {/* <p>{qrcode}</p> */}
             {/* <Image
                className=''
                height={200}
                width={200}
                src={
                  !isUserLoading || !isUserError || user.qr===""
                    ? `https://api.epass.com.np${user?.qr}`
                    : '/user-avatar.png'
                }
                alt='QR Code'
              /> */}
             
              
            </section>
          </div>

          <section className='grid grid-cols-3 gap-4'>
            <InfoCard title='Waiting Visitors' value={waitingVisitor.length} />
            <InfoCard title='Total Visitors' value={visitHistoryData.length} />
            <InfoCard title='Today Visitors' value={todayHistoryData.length} />
          </section>
          <section className='mt-16 '>
            <HistoryTable data={visitHistoryData} />
          </section>
         
          <section className='grid grid-cols-1 gap-4 my-5'>
            <VisitorThisWeek currentWeekData={currentWeekData} />
            {/* <VisitorByBranch /> */}
          </section>
         
       
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  )
}
