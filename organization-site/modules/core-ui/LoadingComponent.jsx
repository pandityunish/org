'use client'

import * as React from 'react'
import CircularProgressWithLabel from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function LoadingComponent () {
  return (
    <Box
      sx={{ display: 'flex' }}
      className='h-[80vh] bg-gray-50 justify-center items-center'
    >
      <CircularProgressWithLabel size={100} />
    </Box>
  )
}
