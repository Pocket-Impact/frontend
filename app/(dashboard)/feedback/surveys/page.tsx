import FormBuilder from '@/components/surveys/FormBuilder'
import PrimaryButton from '@/components/ui/PrimaryButton'
import Link from 'next/link'
import React from 'react'
import { IoAddOutline } from 'react-icons/io5'
import { RxCaretLeft } from 'react-icons/rx'

const page = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className=''>
          <h1 className='x2l font-bold'>Surveys</h1>
          <p className='text-black/60 base'>Review and manage surveys of you organisation</p>
        </div>
        <Link href="/feedback/surveys/new">
          <PrimaryButton text='Create a new survey' styles='py-3 max-lg:py-2.5 max-md:py-2 rounded-gl' icon={<IoAddOutline className='w-5 h-5' />} />
        </Link>
      </div>
    </div >
  )
}

export default page