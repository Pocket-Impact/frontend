import React from 'react'
import { FiUser } from 'react-icons/fi'
import { GoOrganization } from 'react-icons/go'
import logo from '@/public/img/white.svg'
import Image from 'next/image'

const FormSidebar = ({ step }) => {
    return (
        <div className='bg-primary lg:col-span-3 p-5 max-lg:p-3 max-lg:flex justify-between items-center lg:h-full'>
            <div className='flex items-center gap-4'>
                <Image src={logo.src} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                <span className='bricolage lg max-sm:hidden text-white'>
                    Pocket Impact
                </span>
            </div>
            <div className='lg:mt-20 lg:ml-4 max-lg:flex'>
                <div className='flex items-center gap-4'>
                    <div className='bg-white rounded-lg w-max p-2'>
                        <FiUser className={`text-primary w-6 h-auto max-sm:w-5`} />
                    </div>
                    <div className='max-sm:hidden'>
                        <p className='text-white sm'>Your personal details</p>
                        <p className='text-white/50 sm'>Personal details of user</p>
                    </div>
                </div>
                <div className={`h-14 w-5 max-lg:w-14 max-lg:ml-3 max-lg:h-5 max-lg:border-b-2 lg:border-r-2 border-dashed transition-all duration-400 ${step == 1 ? "border-white/50" : "border-white"}`}></div>
                <div className='flex items-center gap-4'>
                    <div className={`${step != 1 ? "bg-white" : "bg-white/30"} transition-all duration-500 rounded-lg w-max p-2`}>
                        <GoOrganization className={`${step != 1 ? "text-primary" : "text-white"} transition-all duration-500 w-6 h-auto max-sm:w-5`} />
                    </div>
                    <div className={`${step == 1 ? "opacity-50" : "opacity-100"} max-sm:hidden transition-all duration-500`}>
                        <p className='text-white sm'>Your organisation's details</p>
                        <p className='text-white/50 sm'>Details of the organisation</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSidebar