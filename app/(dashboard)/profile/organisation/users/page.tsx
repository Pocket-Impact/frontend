import PrimaryButton from '@/components/ui/PrimaryButton'
import Link from 'next/link'
import React from 'react'
import { IoAdd } from 'react-icons/io5'

const page = () => {
  return (
    <div className='inter flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='x2l font-semibold'>Users</h1>
                    <p className='text-black/60 base'>Manage users and their access permissions</p>
                </div>
                    <PrimaryButton text='Add user' styles='p-3 effect rounded-lg' icon={<IoAdd className='rotate-180' />} />
            </div>
        </div>
  )
}

export default page