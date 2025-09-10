import React from 'react'
import logo from '@/public/img/white.svg'
import Image from 'next/image'

const SigninSide = () => {
    // No props used, so no PropTypes needed
    return (
        <div className='bg-primary lg:col-span-3 p-5 max-lg:p-3 max-lg:flex justify-between items-center lg:h-full'>
            <div className='flex items-center gap-4 max-md:gap-2'>
                <Image src={logo.src} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                <span className='bricolage lg text-white'>
                    Pocket Impact
                </span>
            </div>
        </div>
    )
}

export default SigninSide