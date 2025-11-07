"use client"
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../ui/PrimaryButton'
import { links } from '@/lib/links'
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
            setScrolled(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    const borderClass = scrolled ? "outline outline-primary" : "outline outline-background/10";

    return (
        <>
            <nav
                className={`px-4 md:flex hidden z-50 bg-background/40 backdrop-blur-xs rounded-b-2xl fixed w-full max-w-[1440px] justify-between inter h-16 items-center p-2 left-1/2 top-0 -translate-x-[50%] ${borderClass}`}
                role="navigation"
                aria-label="Main navigation"
            >
                <div className='flex items-center gap-2'>
                    <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                    <span className='bricolage xl'>
                        Pocket Impact
                    </span>
                </div>
                <div className='flex gap-10 bricolage'>
                    {links.map((link) => (
                        <a href={`/#${link.href}`} key={link.name} className='' aria-label={link.name}>
                            {link.name}
                        </a>
                    ))}
                </div>
                <div>
                    <Link href="/auth/signup" prefetch aria-label="Sign up">
                        <PrimaryButton text="Get Started" styles="text-sm effect py-3 px-4" />
                    </Link>
                </div>
            </nav>
            <nav
                className={`max-md:flex flex-col ${borderClass} hidden ${open ? "outline outline-primary" : ""} px-4 bg-background z-20 rounded-b-2xl pb-5 fixed w-full max-w-[1440px] justify-between inter transition-all duration-300 overflow-hidden ${!open ? "h-16" : "h-56 outline"} items-center p-2 left-1/2 top-0 -translate-x-[50%] z-10`}
                role="navigation"
                aria-label="Mobile navigation"
            >
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                        <Image src={logo} alt="Pocket Impact Logo" width={logo.width} height={logo.height} className='w-8 h-8' />
                        <span className='bricolage xl'>
                            Pocket Impact
                        </span>
                    </div>
                    <div>
                        <PrimaryButton
                            onClick={() => setOpen(!open)}
                            icon={open ? <IoCloseOutline /> : <CiMenuFries />}
                            styles="text-sm p-3"
                            aria-label={open ? "Close menu" : "Open menu"}
                        />
                    </div>
                </div>
                <div className='flex flex-col mt-4 gap-3 bricolage w-full'>
                    {links.map((link) => (
                        <a href={`/#${link.href}`} key={link.name} className='p-2 w-full' aria-label={link.name}>
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </>
    )
}

export default Navbar