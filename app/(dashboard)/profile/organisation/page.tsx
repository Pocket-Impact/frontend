"use client"
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import PrimaryButton from '@/components/ui/PrimaryButton';
import { apiFetch } from '@/utils/apiFetch';
import { redirect } from 'next/navigation';
import React from 'react'
import { BiSearch, BiUser } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';
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
                    <PrimaryButton onClick={handleClick} text='Log out' styles='p-3 effect rounded-lg' icon={<LuLogOut className='rotate-180' />} />
                </div>
            </div>
            <div className='grid h-[400px] gap-6 lg:grid-cols-5'>
                <div className='bg-white w-full lg:col-span-2 flex flex-col gap-4 border rounded-lg p4 border-stroke'>
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
                <div className='bg-white lg:col-span-3 flex flex-col gap-4 p4 rounded-lg border border-stroke'>
                    <div className='flex justify-between items-start'>
                        <div>
                            <h3 className='font-semibold lg'>Users</h3>
                            <h3 className='text-black/60 sm'>View and edit organisation users</h3>
                        </div>
                        <button className='flex hover:border-stroke border border-white transition duration-300 cursor-pointer p-1 rounded-[3px] pr-2 items-center gap-2'>
                            <IoAdd />
                            <span className='sm'>Add user</span>
                        </button>
                    </div>
                    <div>
                        <table className='w-full'>
                            <thead className='bg-black/10'>
                                <tr>
                                    <th className='font-medium px-3 py-2 sm text-start'>Full name</th>
                                    <th className='font-medium px-3 py-2 sm text-start'>Email</th>
                                    <th className='font-medium px-3 py-2 sm text-start'>Role</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr>
                                    <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>Gutabarwa Chlomi Justifié</td>
                                    <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>gutabarwaa@gmail.com</td>
                                    <td className='font-light base text-start sm px-3 py-2 border-b border-stroke'>Admin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 gap-6'>
                {overviewCards.map((card: any, index: number) => (
                    <OverviewCard key={index} user={true} card={card} index={index} />
                ))}
            </div>
        </div>
    )
}

export default page