"use client"
import React from 'react'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'
import { FaCompass, FaRegHeart } from 'react-icons/fa'
import SideLink from './SideLink'
import { VscFeedback, VscGraph } from 'react-icons/vsc'
import { usePathname } from 'next/navigation'
import { IoIosMore } from 'react-icons/io'

const links = [
    {
        name: "Dashboard",
        href: "/features",
        icon: FaCompass
    },
    {
        name: "Feedback",
        href: "/impact",
        icon: VscFeedback
    },
    {
        name: "Analytics",
        href: "pricing",
        icon: VscGraph
    },
]

const tools = [
    {
        name: "Virtual Program Assistant",
        href: "/features",
        icon: FaCompass
    },
    {
        name: "Donor Engagement Agent",
        href: "/features",
        icon: FaRegHeart
    },
    {
        name: "More",
        href: "/impact",
        icon: IoIosMore
    },
]

const Sidebar = () => {
    const currentLink = usePathname()

    return (
        <div className='h-full flex flex-col justify-between inter'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2 w-[300px] bg-white border border-[#DDDDDD] rounded-2xl p-2.5'>
                    <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-12 h-12' />
                    <div className='flex flex-col'>
                        <span className='inter base font-semibold'>Pocket Impact</span>
                        <span className='inter sm text-black/70'>Feedback tool</span>
                    </div>
                </div>
                <div className='bg-white border border-[#DDDDDD] p-2.5 flex flex-col gap-2.5 rounded-2xl'>
                    {links.map((link) => (
                        <SideLink key={link.name} active={currentLink.includes(link.name.toLowerCase())} link={link} />
                    ))}
                </div>
                <div className='mt-3'>
                    <span className='sm ml-2 font-bold text-gray-700'>Other tools</span>
                    <div className='bg-white border border-[#DDDDDD] mt-2 p-2.5 flex flex-col gap-2.5 rounded-2xl'>
                        {tools.map((link) => (
                            <SideLink key={link.name} active={currentLink.includes(link.name.toLowerCase())} link={link} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-2 w-[300px] bg-white border border-[#DDDDDD] rounded-2xl p-2.5'>
                <div className='w-12 bg-red-400 rounded-lg h-12' />
                <div className='flex flex-col'>
                    <span className='inter base font-semibold'>Organisation Name</span>
                    <span className='inter sm text-black/70'>Profile</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar