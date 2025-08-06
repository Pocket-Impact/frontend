"use client"
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import { links } from '../../lib/links'
import Link from 'next/link'
import logo from '@/public/img/icon.svg'
import Image from 'next/image'
import { CiMenuFries } from "react-icons/ci";
import { IoCloseOutline } from 'react-icons/io5'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            console.log("Scroll position:", window.scrollY); // 👈 Logs on every scroll
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const borderClass = scrolled ? "border-b border-primary border-x" : "border-b border-background border-x";

    return (
        <>
            <div className={`px-4 md:flex hidden z-50 bg-background rounded-b-2xl fixed w-full max-w-[1440px] justify-between inter h-16 items-center p-2 left-1/2 top-0 -translate-x-[50%] ${borderClass}`}>
                <div className='flex items-center gap-2'>
                    <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                    <span className='bricolage xl'>
                        Pocket Impact
                    </span>
                </div>
                <div className='flex gap-10 bricolage'>
                    {links.map((link) => (
                        <a href={`/#${link.href}`} key={link.name} className=''>
                            {link.name}
                        </a>
                    ))}
                </div>
                <div>
                    <Link href="/auth/signup">
                        <PrimaryButton text="Get Started" styles="text-sm py-3 px-6" />
                    </Link>
                </div>
            </div>
            <div className={`max-md:flex flex-col hidden px-4 bg-background z-20 rounded-b-2xl pb-5 outline-black/30 fixed w-full max-w-[1440px] justify-between inter transition-all duration-300 overflow-hidden ${!open ? "h-16" : "h-56 outline"} items-center p-2 left-1/2 top-0 -translate-x-[50%] z-10 ${borderClass}`}>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                        <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                        <span className='bricolage xl'>
                            Pocket Impact
                        </span>
                    </div>
                    <div>
                        <PrimaryButton onClick={() => setOpen(!open)} icon={open ? <IoCloseOutline /> : <CiMenuFries />} styles="text-sm p-3" />
                    </div>
                </div>
                <div className='flex flex-col mt-4 gap-3 bricolage w-full'>
                    {links.map((link) => (
                        <Link href={link.href} key={link.name} className='p-2 w-full'>
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Navbar