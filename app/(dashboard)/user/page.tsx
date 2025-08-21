"use client"
import OverviewCard from '@/components/feedback/surveys/OverviewCard'
import React from 'react'
import { BiSearch, BiUser } from 'react-icons/bi';
import { RiSurveyLine } from 'react-icons/ri';
import { VscFeedback } from 'react-icons/vsc';

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
    return (
        <div className='inter flex flex-col gap-6'>
            <div className=''>
                <h1 className='x2l font-semibold'>Org XYZ</h1>
                <p className='text-black/60 base'>Manage organisation.</p>
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