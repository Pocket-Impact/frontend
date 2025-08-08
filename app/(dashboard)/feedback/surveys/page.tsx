import FormBuilder from '@/components/surveys/FormBuilder'
import React from 'react'
import { RxCaretLeft } from 'react-icons/rx'

const page = () => {
  return (
    <div>
      <div className='hidden'>
        <h1 className='x2l font-bold'>Surveys</h1>
        <p className='text-black/60 base'>Review and manage surveys from your customers</p>
      </div>
      <div className='flex items-center gap-2 hover:gap-3 transition-all cursor-pointer mb-4 duration-300'>
        <div className='bg-primary/80 hover:bg-primary transition duration-300 text-white rounded-lg w-max p-1'>
          <RxCaretLeft className='w-6 h-auto' />
        </div>
        <span className='text-black/70 font-medium'>Back to Surveys</span>
      </div>
      <FormBuilder />
    </div >
  )
}

export default page