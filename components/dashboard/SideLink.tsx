"use client"
import Link from 'next/link'
import React from 'react'

const SideLink: React.FC<{ link: any, active: boolean }> = ({ link, active }) => {
    return (
        <Link href={link.href}>
            <div className={`${active ? "bg-primary text-white" : ""} flex  items-center hover:bg-primary/10 transition duration-300 text-primary gap-3.5 inter font-semibold p-3.5 rounded-lg`}>
                <link.icon className='w-6 max-lg:w-5 max-md:w-4 h-auto' />
                <span className='base'>{link.name}</span>
            </div>
        </Link>
    )
}

export default SideLink