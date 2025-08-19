"use client"
import React from 'react'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'
import { FaCompass, FaRegHeart } from 'react-icons/fa'
import SideLink from './SideLink'
import { VscFeedback, VscGraph } from 'react-icons/vsc'
import { usePathname } from 'next/navigation'
import { IoIosMore } from 'react-icons/io'
import OrgTab from './OrgTab'

const links = [
    {
        name: "Dashboard",
        href: "/feedback/dashboard",
        icon: FaCompass
    },
    {
        name: "Surveys",
        href: "/feedback/surveys",
        icon: VscFeedback
    },
    {
        name: "Analytics",
        href: "/feedback/analytics",
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
        <div className='h-full flex flex-col bg-white w-[300px] md:min-w-[300px] max-md:w-max justify-between border-r border-stroke inter'>
            <div className='flex flex-col'>
                <div className='flex items-center gap-2 p4 border-b border-stroke'>
                    <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-12 max-lg:w-10 max-md:w-8 h-auto' />
                    <div className='flex flex-col max-md:hidden'>
                        <span className='inter base font-semibold'>Pocket Impact</span>
                        <span className='inter sm text-black/70'>Feedback tool</span>
                    </div>
                </div>
                <div className='p4 flex flex-col border-b border-stroke gap-2 max-md:gap-1.5'>
                    <span className='font-bold text-black/50 xs max-md:hidden uppercase'>Feedback links</span>
                    <div className='flex flex-col gap-2'>
                        {links.map((link) => (
                            <SideLink key={link.name} active={currentLink.includes(link.name.toLowerCase())} link={link} />
                        ))}
                    </div>
                </div>
                <div className='p4 flex flex-col gap-2 max-md:gap-1.5'>
                    <span className='font-bold text-black/50 xs max-md:hidden uppercase'>Other tools</span>
                    <div className='flex flex-col gap-2'>
                        {tools.map((link) => (
                            <SideLink key={link.name} active={currentLink.includes(link.name.toLowerCase())} link={link} />
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <OrgTab />
                <div className='border-t border-stroke p4 text-center sm text-black/50'>
                    &copy; {new Date().getFullYear()} Pocket Impact Inc
                </div>
            </div>
        </div>
    )
}

export default Sidebar