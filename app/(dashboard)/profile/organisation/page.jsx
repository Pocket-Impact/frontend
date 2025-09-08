"use client"
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import OrgDetails from '@/components/profile/admin/OrgDetails';
import UserDetails from '@/components/profile/admin/UserDetails';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { apiFetch } from '@/utils/apiFetch';
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


const page = () => {
    const [orgData, setOrgData] = React.useState(null);
    const [overviewCards, setOverviewCards] = React.useState(defaultOverviewCards);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchOrgData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await apiFetch('/api/dashboard/organisation');
                const data = await res.json();
                if (!res.ok || data.status !== 'success') {
                    setError(data.message || 'Could not fetch organisation data.');
                } else {
                    setOrgData(data.data);
                    setOverviewCards([
                        {
                            value: data.data.researchers,
                            title: 'Researchers',
                            subtitle: 'All researchers',
                            icon: BiUser,
                        },
                        {
                            value: data.data.adminUsers,
                            title: 'Admins',
                            subtitle: 'All admins',
                            icon: BiUser,
                        },
                        {
                            value: data.data.analysts,
                            title: 'Analysts',
                            subtitle: 'All analysts',
                            icon: BiSearch,
                        },
                    ]);
                }
            } catch (err) {
                setError('Server error. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrgData();
    }, []);

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

export default page