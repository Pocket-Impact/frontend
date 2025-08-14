import React from 'react'
import { AiOutlineLineChart } from 'react-icons/ai';
import { BiDonateHeart } from 'react-icons/bi';
import { IoIosHammer } from 'react-icons/io';
import { TbReportSearch } from 'react-icons/tb';

export const problems = [
    {
        title: "Manual Reporting & Admin Overhead",
        text: "Too much paperwork and manual processes slow down your mission.",
        icon: <TbReportSearch    className="w-8 h-8" />
    },
    {
        title: "Difficulty Engaging Donors at Scale",
        text: "Reaching and inspiring donors is challenging without the right tools.",
        icon: <BiDonateHeart className="w-8 h-8" />
    },
    {
        title: "Limited Capacity to Measure & Show Real Impact",
        text: "It's hard to track and communicate the true results of your work.",
        icon: <AiOutlineLineChart className="w-8 h-8" />
    }
];

const ProblemsSection = () => {
    return (
        <div className='py-32 px-28 grid grid-cols-3 items-start inter'>
            <div className='flex flex-col gap-10'>
                <h4 className='p-2 px-4 rounded-2xl bg-amber-200 border-amber-600 text-amber-800 sm border w-max uppercase'>Problems</h4>
                <h2 className='bricolage x3l font-bold'>Why Pocket Impact ?</h2>
                <p className='text-black/80 w-full max-w-[300px]'>Running a mission-driven organization is tough — too much admin, not enough time for impact.</p>
            </div>
            <div className='grid grid-cols-2 gap-3 col-span-2'>
                {problems.map((problem, index) => (
                    <div key={index} className='bg-white border border-stroke rounded-x2l p-6 flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            {problem.icon}
                        </div>
                        <div>
                            <h3 className='font-semibold base'>{problem.title}</h3>
                            <p className='text-black/70 sm'>{problem.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProblemsSection