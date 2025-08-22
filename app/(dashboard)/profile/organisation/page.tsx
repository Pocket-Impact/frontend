"use client"
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import PrimaryButton from '@/components/ui/PrimaryButton';
import { apiFetch } from '@/utils/apiFetch';
import { redirect } from 'next/navigation';
import React from 'react'
import { BiSearch, BiUser } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';

const overviewCards: any = [
    {
        value: "0245",
        title: "Users",
        subtitle: "All users",
        icon: BiUser,
    },
    {
        value: "0245",
        title: "Admins",
        subtitle: "All admins",
        icon: BiUser,
    },
    {
        value: "0245",
        title: "Analysts",
        subtitle: "All analysts",
        icon: BiSearch,
    },
];


const page = () => {
    const handleClick = () => {
        const logout = async () => {
            const response = await apiFetch("/api/auth/logout")
            redirect('/auth/signin')
        }

        logout()
    }
    return (
        <div className='inter flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='x2l font-semibold'>Organisation profile</h1>
                    <p className='text-black/60 base'>Manage organisation.</p>
                </div>
                <div>
                    <PrimaryButton onClick={handleClick} text='Log out' styles='p-3 rounded-lg' icon={<LuLogOut  className='rotate-180' />} />
                </div>
            </div>
            <div className='grid h-[400px] gap-6 grid-cols-5'>
                <div className='bg-white col-span-2 flex flex-col gap-4 border rounded-lg p-4 border-stroke'>
                    <div>
                        <h3 className='font-semibold lg'>Organisation details</h3>
                        <h3 className='text-black/60 sm'>View and edit organisation information</h3>
                    </div>
                    <div className='flex flex-col'>
                        <span className='xs font-medium text-black/60'>Organisation Name</span>
                        <span className='base'>Org XYZ</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='xs font-medium text-black/60'>Organisation Country</span>
                        <span className='base'>USA</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='xs font-medium text-black/60'>Organisation Size</span>
                        <span className='base'>Medium (20 - 100)</span>
                    </div>
                </div>
                <div className='bg-white col-span-3 rounded-lg border border-stroke'></div>
            </div>
            <div className='grid grid-cols-3 gap-6'>
                {overviewCards.map((card: any, index: number) => (
                    <OverviewCard key={index} user={true} card={card} index={index} />
                ))}
            </div>
        </div>
    )
}

export default page