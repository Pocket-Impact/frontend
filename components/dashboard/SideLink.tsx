"use client"
import Link from 'next/link'
import React from 'react'

const SideLink: React.FC<{ link: any, active: boolean }> = ({ link, active }) => {
    return (
        <Link href={link.href}>
            <div className={`${active ? "bg-primary text-white" : "hover:bg-primary/10"} flex max-md:w-max items-center transition duration-300 text-primary gap-3.5 inter font-semibold p-3.5 max-lg:p-3 max-md:p-2 rounded-gl`}>
                <link.icon className='w-6 max-lg:w-5 max-md:w-4 h-auto' />
                <span className='base max-md:hidden'>{link.name}</span>
            </div>
        </Link>
    )
}

export default SideLink