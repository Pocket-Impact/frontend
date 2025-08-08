import React from 'react'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'
import OtpForm from '@/components/auth/OtpForm'

const page = () => {
    return (
        <div className='p-5 h-full'>
            <div className='flex items-center gap-2'>
                <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                <span className='inter lg font-semibold'>
                    Pocket Impact
                </span>
            </div>
            <OtpForm />
        </div>
    )
}

export default page