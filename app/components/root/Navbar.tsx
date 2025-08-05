import React from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import { links } from '../../lib/links'
import Link from 'next/link'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'


const Navbar = () => {
    return (
        <div className='flex px-4 bg-background rounded-b-2xl fixed w-full max-w-[1440px] justify-between inter h-16 items-center p-2 left-1/2 top-0 -translate-x-[50%] z-10'>
            <div className='flex items-center gap-2'>
                <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                <span className='bricolage xl'>
                    Pocket Impact
                </span>
            </div>
            <div className='flex gap-10 bricolage'>
                {links.map((link) => (
                    <Link href={link.href} key={link.name} className=''>
                        {link.name}
                    </Link>
                ))}
            </div>
            <div>
                <PrimaryButton text="Get Started" styles="text-sm py-3 px-6" />
            </div>
        </div>
    )
}

export default Navbar