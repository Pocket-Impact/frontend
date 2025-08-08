import React from 'react'
import PrimaryButton from '@/components/ui/PrimaryButton'
import { links } from '@/lib/links'
import Link from 'next/link'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from 'react-icons/io5'
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