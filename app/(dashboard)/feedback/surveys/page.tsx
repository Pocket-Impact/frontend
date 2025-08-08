import FormBuilder from '@/components/surveys/FormBuilder'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className=''>
        <h1 className='x2l font-bold'>Surveys</h1>
        <p className='text-black/60 base'>Review and manage surveys from your customers</p>
      </div>
      <FormBuilder />
    </div>
  )
}

export default page