"use client"
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import OrgDetails from '@/components/profile/admin/OrgDetails';
import UserDetails from '@/components/profile/admin/UserDetails';
import PrimaryButton from '@/components/ui/PrimaryButton';
import useFetch from '@/hooks/useFetch';
import { redirect } from 'next/navigation';
import React from 'react'
import { BiSearch, BiUser } from 'react-icons/bi';
import { LuLogOut } from 'react-icons/lu';

const defaultOverviewCards = [
    {
        value: "0",
        increase: 40,
        title: "Researchers",
        subtitle: "All researchers",
        icon: BiUser,
    },
    {
        value: "0",
        increase: 40,
        title: "Admins",
        subtitle: "All admins",
        icon: BiUser,
    },
    {
        value: "0",
        increase: 40,
        title: "Analysts",
        subtitle: "All analysts",
        icon: BiSearch,
    },
];


const OrganisationPage = () => {
    const { data: orgResponse, loading, error } = useFetch('/api/dashboard/organisation');

    const orgData = orgResponse?.status === 'success' ? orgResponse.data : null;

    const overviewCards = orgData ? [
        {
            value: orgData.researchers,
            title: 'Researchers',
            subtitle: 'All researchers',
            icon: BiUser,
        },
        {
            value: orgData.adminUsers,
            title: 'Admins',
            subtitle: 'All admins',
            icon: BiUser,
        },
        {
            value: orgData.analysts,
            title: 'Analysts',
            subtitle: 'All analysts',
            icon: BiSearch,
        },
    ] : defaultOverviewCards;

    const handleClick = () => {
        const logout = async () => {
            await apiFetch("/api/auth/logout")
            redirect('/auth/signin')
        }
        logout()
    }

    return (
        <div className='inter flex flex-col gap-6'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='x2l font-semibold'>Organisation profile</h1>
                    <p className='text-black/60 base'>Manage organisation</p>
                </div>
                <div>
                    <PrimaryButton onClick={handleClick} text='Log out' styles='p-3 effect base rounded-lg' icon={<LuLogOut className='rotate-180' />} />
                </div>
            </div>
            <div className='grid h-[400px] gap-6 lg:grid-cols-5'>
                <OrgDetails orgData={orgData} loading={loading} error={error} />
                <UserDetails />
            </div>
            <div className='grid lg:grid-cols-3 gap-6'>
                {overviewCards.map((card, index) => (
                    <OverviewCard key={index} user={true} card={card} index={index} />
                ))}
            </div>
        </div>
    )
}

export default OrganisationPage;