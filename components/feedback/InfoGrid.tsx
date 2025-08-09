import React from 'react'

const InfoGrid = () => {
  return (
    <div className='grid grid-cols-3 max-lg:grid-cols-1 mt-3 gap-4  h-full'>
        <div className='border lg:col-span-2 border-stroke rounded-2xl flex items-center justify-center h-[450px]'>INFO</div>
        <div className='border border-stroke rounded-2xl flex items-center justify-center h-[450px]'>INFO</div>
    </div>
  )
}

export default InfoGrid