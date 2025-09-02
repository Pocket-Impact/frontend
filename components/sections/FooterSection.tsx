import React from 'react'
import logo from '@/public/img/white.svg'
import Image from 'next/image'
import { links } from '@/lib/links'
import { link } from 'fs'
import Link from 'next/link'
import { icons } from '@/lib/icons'

const FooterSection = () => {
    return (
        <div className='bg-primary px-10 pt-10 rounded-t-3xl'>
            <div className='flex border-b pb-10 border-white/30 justify-between gap-20'>
                <div className='flex flex-col gap-5'>
                    <div className='text-white flex items-center gap-4'>
                        <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                        <span className='bricolage xl'>Pocket Impact</span>
                    </div>
                    <div className='inter max-md:hidden text-white/80 w-full max-w-xl'>
                        <p>Pocket Impact is a unified platform designed to help NGOs manage their projects, teams, data, and communication in one place — making it easier to drive meaningful change.</p>
                    </div>
                    <div className='flex gap-4'>
                        {icons.map((icon, index) => (
                            <div className='bg-white/80 hover:bg-white/100 transition duration-300 p-2 max-md:p-1.5 rounded-lg' key={index}>
                                <icon.icon className='xl w-6 max-lg:w-4 max-md:w-3 h-auto' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='text-white inter'>
                    <h1 className='base font-bold text-white text-right'>Links</h1>
                    <div className='flex flex-col gap-1 mt-2'>
                        {links.map((link) => (
                            <Link href={`/#${link.href}`} key={link.name} className='text-white/80 text-right hover:text-white hover:underline underline-offset-2 transition-colors duration-300 base'>
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='text-white/80 base p-4 inter text-center'>
                &copy; {new Date().getFullYear()} Pocket Impact. All rights reserved.
            </div>
        </div>
    )
}

export default FooterSection