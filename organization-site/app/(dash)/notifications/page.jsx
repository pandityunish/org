'use client'

import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useNotifications } from '@/modules/hooks/useNotificationData'
import { useRouter } from 'next/navigation'

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Sender', width: 150 },
  { field: 'message', headerName: 'Message', width: 500 },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    width: 200,
    valueGetter: params => {
      const timestamp = new Date(params.value)
      return timestamp.toLocaleString()
    }
  }
]

const Page = () => {
  const router = useRouter()
  const { notificationData } = useNotifications()

  const handleRowClick = (params, event) => {
    router.push(`/notifications/${params.id}`)
  }

  return (
    <div style={{ height: 900, width: '100%' }}>
      <h1 className='my-2 font-semibold'>Recent Notifications</h1>
      <DataGrid
        rows={notificationData}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
      />
    </div>
  )
}

export default Page
